import { INestApplication, ValidationPipe } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { Test, TestingModule } from "@nestjs/testing";
import * as pactum from "pactum";
import { PrismaService } from "../prisma/prisma.service";
import { SurveyScoreModule } from "./survey-score.module";
import { CreateSurveyScoreDto } from "./dto";

describe("SurveyFormController e2e", () => {
  let app: INestApplication;
  let prisma: PrismaService;
  let module: TestingModule;

  beforeAll(async () => {
    module = await Test.createTestingModule({
      imports: [SurveyScoreModule],
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

  describe("create()", () => {
    it("should create a new survey score", async () => {
      const createSurveyScoreDto: CreateSurveyScoreDto = {
        competencyId: 1,
        competencyLevelNumber: 1,
        score: 30,
        surveyFormId: 1,
      };

      const response = await pactum
        .spec()
        .post("/survey-score")
        .withBody(createSurveyScoreDto)
        .expectStatus(201);

      const surveyScore = JSON.parse(response.body);

      expect(surveyScore).toBeDefined();
      expect(surveyScore.surveyFormId).toEqual(
        createSurveyScoreDto.surveyFormId
      );
      expect(surveyScore.score).toEqual(createSurveyScoreDto.score);
      expect(surveyScore.surveyFormId).toEqual(
        createSurveyScoreDto.surveyFormId
      );
    });

    it("should return a 400 error if the request body is invalid", async () => {
      const createSurveyScoreDto = {
        surveyFormId: null,
        userId: "",
        answers: {},
      };

      const response = await pactum
        .spec()
        .post("/survey-score")
        .withBody(createSurveyScoreDto)
        .expectStatus(400);

      const errorMessage = response.json().message;

      expect(errorMessage).toContain("Invalid request body");
    });
  });
});

describe("findAll()", () => {
  it("should get all survey scores", async () => {
    const response = await pactum.spec().get("/survey-score").expectStatus(200);

    const surveyScores = JSON.parse(response.body);

    expect(surveyScores).toBeDefined();
    expect(surveyScores.data).toHaveLength(0);
  });
});

describe("findBySurveyFormId()", () => {
  it("should get survey scores by survey form ID", async () => {
    const surveyFormId = 1;

    const response = await pactum
      .spec()
      .get(`/survey-score/survey-form/${surveyFormId}`)
      .expectStatus(200);

    const surveyScores = JSON.parse(response.body);

    expect(surveyScores).toBeDefined();
    expect(surveyScores.data).toHaveLength(0);
  });
});

describe("findOne()", () => {
  it("should get a survey score by ID", async () => {
    const id = 1;

    const response = await pactum
      .spec()
      .get(`/survey-score/${id}`)
      .expectStatus(200);

    const surveyScore = JSON.parse(response.body);

    expect(surveyScore).toBeDefined();
    expect(surveyScore.id).toEqual(id);
  });
});
