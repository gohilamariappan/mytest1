import * as pactum from "pactum";
import { INestApplication, ValidationPipe } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { Test, TestingModule } from "@nestjs/testing";
import { SurveyConfigModule } from "./survey-config.module";
import { ConfigService } from "@nestjs/config";

describe("SurveyConfig e2e", () => {
  let app: INestApplication;
  let prisma: PrismaService;
  let module: TestingModule;

  beforeAll(async () => {
    module = await Test.createTestingModule({
      imports: [SurveyConfigModule],
    }).compile();

    app = module.createNestApplication();
    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
      })
    );

    const configService = app.get<ConfigService>(ConfigService);
    const apiPrefix = configService.get<string>("API_PREFIX") || "api";
    const PORT = configService.get<number>("APP_PORT") || 4010;
    app.setGlobalPrefix(apiPrefix);

    await app.init();
    await app.listen(PORT);

    prisma = app.get(PrismaService);
    pactum.request.setBaseUrl(`http://localhost:${PORT}/${apiPrefix}`);
  });

  afterAll(async () => {
    app.close();
  });

  describe("SurveyConfigController createSurveyConfig()", () => {
    it("should create a new survey config", async () => {
      const createSurveyConfigDto = {
        name: "Test Survey Config",
        departmentId: 1,
        startTime: new Date(),
        endTime: new Date(),
      };

      const response = await pactum
        .spec()
        .post("/survey-config")
        .withBody(createSurveyConfigDto)
        .expectStatus(201);

      const createdSurveyConfig = JSON.parse(response.body);

      expect(createdSurveyConfig.name).toBe("Test Survey Config");
      expect(createdSurveyConfig.departmentId).toBe(1);
      expect(createdSurveyConfig.startTime).toBeDefined();
      expect(createdSurveyConfig.endTime).toBeDefined();
    });
  });

  describe("SurveyConfigController getAllSurveyConfig()", () => {
    it("should get all survey configs", async () => {
      const response = await pactum
        .spec()
        .get("/survey-config")
        .expectStatus(200);

      const surveyConfigs = JSON.parse(response.body);

      expect(surveyConfigs.length).toBeGreaterThanOrEqual(0);
    });
  });

  describe("SurveyConfigController updateSurveyConfigById()", () => {
    it("should update an existing survey config", async () => {
      const updateSurveyConfigDto = {
        name: "Updated Test Survey Config",
        departmentId: 2,
      };

      const response = await pactum
        .spec()
        .put("/survey-config/1")
        .withBody(updateSurveyConfigDto)
        .expectStatus(200);

      const updatedSurveyConfig = JSON.parse(response.body);

      expect(updatedSurveyConfig.name).toBe("Updated Test Survey Config");
      expect(updatedSurveyConfig.departmentId).toBe(2);
    });
  });

  describe("SurveyConfigController deleteSurveyConfigById()", () => {
    it("should delete an existing survey config", async () => {
      const response = await pactum
        .spec()
        .delete("/survey-config/1")
        .expectStatus(200);

      const deletedSurveyConfig = JSON.parse(response.body);

      expect(deletedSurveyConfig.name).toBeDefined();
      expect(deletedSurveyConfig.departmentId).toBeDefined();
      expect(deletedSurveyConfig.startTime).toBeDefined();
      expect(deletedSurveyConfig.endTime).toBeDefined();
    });
  });
});
