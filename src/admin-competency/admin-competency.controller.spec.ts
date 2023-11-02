import * as pactum from "pactum";
import { Test, TestingModule } from "@nestjs/testing";
import { INestApplication, ValidationPipe } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { ConfigService } from "@nestjs/config";
import { CreateAdminCompetencyDto } from "./dto/create-admin-competency.dto";
import { UpdateAdminCompetencyDto } from "./dto";
import { AdminCompetencyModule } from "./admin-competency.module";

describe("AdminCompetencyController e2e", () => {
  let app: INestApplication;
  let prisma: PrismaService;
  let module: TestingModule;
  beforeAll(async () => {
    module = await Test.createTestingModule({
      imports: [AdminCompetencyModule],
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

  describe("AdminCompetencyController create()", () => {
    it("should return created admin competency on success", async function () {
      const createAdminCompetencyDto: CreateAdminCompetencyDto = {
        competencyId: 1,
        name: "Test create admin competency",
        competencyLevels: [
          { competencyLevelNumber: 1, competencyLevelName: "Test-1" },
        ],
        description: "Testing description",
      };

      const response = await pactum
        .spec()
        .post("/admin-competency")
        .withBody(createAdminCompetencyDto)
        .expectStatus(201);

      const createdAdminCompetency = JSON.parse(response.body);
      expect(createdAdminCompetency).not.toBeNull();
      expect(createdAdminCompetency.name).toEqual(
        createAdminCompetencyDto.name
      );
      expect(createdAdminCompetency.description).toEqual(
        createAdminCompetencyDto.description
      );
      expect(
        createdAdminCompetency.competencyLevels[0].competencyLevelName
      ).toEqual(
        createAdminCompetencyDto.competencyLevels[0].competencyLevelName
      );
      expect(
        createdAdminCompetency.competencyLevels[0].competencyLevelNumber
      ).toEqual(
        createAdminCompetencyDto.competencyLevels[0].competencyLevelNumber
      );
      expect(createdAdminCompetency.createdAt).toBeDefined();
      expect(createdAdminCompetency.updatedAt).toBeDefined();
    });
  });

  describe("AdminCompetencyController, findAll()", () => {
    it("should get all admin competency", async () => {
      const response = await pactum
        .spec()
        .get("/admin-competency")
        .expectStatus(200);
      const adminCompetencies = JSON.parse(response.body);
      expect(Array.isArray(adminCompetencies)).toBeTruthy();
    });
  });

  describe("AdminCompetencyController update()", () => {
    it("should get admin competency by competencyId", async () => {
      const updatedAdminCompetencyDto: UpdateAdminCompetencyDto = {
        name: "Updated Test Competency Name",
        description: "Updated Test Description",
      };
      const testData = {
        id: 1,
        competencyId: 55,
      };
      const response = await pactum
        .spec()
        .patch(`/admin-competency/${testData.id}/${testData.competencyId}`)
        .withPathParams({
          id: testData.id,
          competencyId: testData.competencyId,
        })
        .withBody(updatedAdminCompetencyDto)
        .expectStatus(200);

      const updatedAdminCompetency = JSON.parse(response.body);
      expect(updatedAdminCompetency).not.toBeNull();
      expect(updatedAdminCompetency.name).toEqual(
        updatedAdminCompetencyDto.name
      );
      expect(updatedAdminCompetency.description).toEqual(
        updatedAdminCompetencyDto.description
      );
    });
  });

  describe("AdminCompetencyController  remove()", () => {
    it("should delete an admin competency by id", async () => {
      const testData = {
        id: 1,
        competencyId: 55,
      };
      const response = await pactum
        .spec()
        .delete(`/admin-competency/${testData.id}/${testData.competencyId}`)
        .withPathParams({
          id: testData.id,
          competencyId: testData.competencyId,
        })
        .expectStatus(200);
      const deletedAdminCompetency = JSON.parse(response.body);
      expect(deletedAdminCompetency).not.toBeNull();
      expect(deletedAdminCompetency.id).toEqual(1);
      expect(deletedAdminCompetency.competencyId).toEqual(55);
      expect(deletedAdminCompetency.name).toBeDefined();
      expect(deletedAdminCompetency.competencyLevels).toBeDefined();
      expect(deletedAdminCompetency?.description).toBeDefined();
      expect(deletedAdminCompetency?.createdAt).toBeDefined();
      expect(deletedAdminCompetency?.updatedAt).toBeDefined();
    });
  });
});
