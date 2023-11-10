import * as pactum from "pactum";
import { Test, TestingModule } from "@nestjs/testing";
import { INestApplication, ValidationPipe } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { ConfigService } from "@nestjs/config";
import { CreateSurveyCycleParameterDto } from "./dto/create-survey-cycle-parameter.dto";
import { UpdateSurveyCycleParameterDto } from "./dto/update-survey-cycle-parameter.dto";
import { SurveyCycleParameterModule } from "./survey-cycle-parameter.module";

describe("SurveyCycleParameterController e2e", () => {
  let app: INestApplication;
  let prisma: PrismaService;
  let module: TestingModule;
  beforeAll(async () => {
    module = await Test.createTestingModule({
      imports: [SurveyCycleParameterModule],
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
    await app.close();
  });
  describe("SurveyCycleParameterController createSurveyParameter()", () => {
    it("should return created survey cycle parameter with id ", async function () {
      const createSurveyCycleParameterDto: CreateSurveyCycleParameterDto = {
        startTime: new Date("2023-10-31"),
        endTime: new Date("2024-01-31"),
        surveyConfigId: 1,
        isActive: true,
      };

      const response = await pactum
        .spec()
        .post("/survey-cycle-parameter")
        .withBody(createSurveyCycleParameterDto)
        .expectStatus(201);

      const createdSurveyCycleParameter = JSON.parse(
        JSON.stringify(response.body)
      );
      expect(createdSurveyCycleParameter.message).toEqual(
        "Survey cycle parameter created successfully."
      );
      expect(createdSurveyCycleParameter.data).toHaveProperty("id");
      expect(createdSurveyCycleParameter.data.startTime).toBeDefined();
      expect(createdSurveyCycleParameter.data.endTime).toBeDefined();
      expect(createdSurveyCycleParameter.data.isActive).toBeTruthy();
      expect(createdSurveyCycleParameter.data.surveyConfigId).toEqual(
        createSurveyCycleParameterDto.surveyConfigId
      );
      expect(createdSurveyCycleParameter?.data.createdAt).toBeDefined();
      expect(createdSurveyCycleParameter?.data.updatedAt).toBeDefined();
    });
  });

  describe("SurveyCycleParameterController getAllSurveyParameter()", () => {
    it("should get all survey cycle parameter", async () => {
      const response = await pactum
        .spec()
        .get("/survey-cycle-parameter")
        .expectStatus(200);

      const getAllSurveyCycleParameter = JSON.parse(
        JSON.stringify(response.body)
      );
      expect(getAllSurveyCycleParameter.message).toEqual(
        "Successfully fetched all survey cycle parameter."
      );
      expect(getAllSurveyCycleParameter.data.length).toBeGreaterThanOrEqual(0);
    });
  });

  describe("SurveyCycleParameterController updateSurveyParameterById()", () => {
    it("should update survey cycle parameter by id", async () => {
      const testData = {
        id: 1,
      };
      const updateSurveyCycleParameterDto: UpdateSurveyCycleParameterDto = {
        startTime: new Date("2025-10-31"),
        endTime: new Date("2025-11-31"),
        isActive: false,
      };
      const response = await pactum
        .spec()
        .patch(`/survey-cycle-parameter/update/${testData.id}`)
        .withPathParams({
          id: testData.id,
        })
        .withBody(updateSurveyCycleParameterDto)
        .expectStatus(200);
      const updatedSurveyCycleParameter = JSON.parse(
        JSON.stringify(response.body)
      );
      expect(updatedSurveyCycleParameter.message).toEqual(
        `Successfully updated survey cycle parameter for id #${testData.id}`
      );
      expect(updatedSurveyCycleParameter.data).toHaveProperty("id");
      expect(updatedSurveyCycleParameter.data.startTime).toBeDefined();
      expect(updatedSurveyCycleParameter.data.endTime).toBeDefined();
      expect(updatedSurveyCycleParameter.data.isActive).toEqual(
        updateSurveyCycleParameterDto.isActive
      );
      expect(updatedSurveyCycleParameter?.data.createdAt).toBeDefined();
      expect(updatedSurveyCycleParameter?.data.updatedAt).toBeDefined();
    });
  });
});
