import * as pactum from "pactum";
import { INestApplication, ValidationPipe } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { Test, TestingModule } from "@nestjs/testing";
import { ConfigService } from "@nestjs/config";
import { SurveyFormModule } from "./survey-form.module";
import { CreateSurveyFormDto } from "./dto";
import { SurveyStatusEnum } from "@prisma/client";

describe("SurveyFormController e2e", () => {
  let app: INestApplication;
  let prisma: PrismaService;
  let module: TestingModule;

  beforeAll(async () => {
    module = await Test.createTestingModule({
      imports: [SurveyFormModule],
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

  // beforeEach(async () => {
  //   // You may want to reset or seed the database before each test.
  //   // This is not shown in the provided code but is important for reliable testing.
  // });

  describe("createSurveyForm", () => {
    it("should create a new survey form", async () => {
      const createSurveyFormDto: CreateSurveyFormDto = {
        userId: "a95f43a6-4bc6-4c5d-8833-8ef2958f9d98",
        surveyCycleParameterId: 1,
        status: SurveyStatusEnum.CREATED,
        questionsJson: [
          { questionId: 1, question: "Is this a dummy question?" },
        ],
      };

      const response = await pactum
        .spec()
        .post("/survey-form")
        .withHeaders("Content-Type", "application/json")
        .withBody(createSurveyFormDto)
        .expectStatus(201)
        .expectJsonLike({
          message: "SurveyForm created successfully",
          data: {
            id: 1,
            userId: "a95f43a6-4bc6-4c5d-8833-8ef2958f9d98",
            surveyCycleParameterId: 1,
            status: SurveyStatusEnum.CREATED,
            questionsJson: [
              { questionId: 1, question: "Is this a dummy question?" },
            ],
          },
        });

      expect(response.json().data.id).toBeGreaterThan(0);
    });
  });

  describe("getSurveyFormById", () => {
    it("should get a survey form by ID", async () => {
      // Create a survey form in the database (you can use Prisma for this)
      // const createdSurveyForm = await createSurveyFormInDatabase();

      const response = await pactum
        .spec()
        .get(`/survey-form/1`)
        .expectStatus(200);

      const surveyForm = response.body;

      expect(surveyForm.message).toBe("SurveyForm fetched successfully");
      expect(surveyForm.data.id).toBe(1);
    });
  });

  describe("updateSurveyFormStatus", () => {
    it("should update the status of a survey form", async () => {
      // Create a survey form in the database (you can use Prisma for this)
      // const createdSurveyForm = await createSurveyFormInDatabase();

      const updateData = { status: SurveyStatusEnum.PUBLISHED };

      const response = await pactum
        .spec()
        .patch(`/survey-form/1`)
        .withJson(updateData)
        .expectStatus(200);

      const updatedSurveyForm = response.body;

      expect(updatedSurveyForm.message).toBe("SurveyForm updated successfully");
      expect(updatedSurveyForm.data.status).toBe(SurveyStatusEnum.PUBLISHED);
    });
  });

  describe("deleteSurveyForm", () => {
    it("should delete a survey form by ID", async () => {
      // Create a survey form in the database (you can use Prisma for this)
      // const createdSurveyForm = await createSurveyFormInDatabase();

      const response = await pactum
        .spec()
        .delete(`/survey-form/1`)
        .expectStatus(200);

      const deletedSurveyForm = response.body;

      expect(deletedSurveyForm.message).toBe("SurveyForm deleted successfully");
      expect(deletedSurveyForm.data.id).toBe(1);
    });
  });
});

// async function createSurveyFormInDatabase() {
//   // Create a survey form in the database (you can use Prisma for this)
//   // Return the created survey form for testing purposes
// }
