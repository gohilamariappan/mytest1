import * as pactum from "pactum";
import { Test, TestingModule } from "@nestjs/testing";
import { INestApplication, ValidationPipe } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { ConfigService } from "@nestjs/config";
import { UserMetadataModule } from "./user-metadata.module";

describe("UserMetadataController", () => {
  let app: INestApplication;
  let prisma: PrismaService;
  let module: TestingModule;

  beforeAll(async () => {
    module = await Test.createTestingModule({
      imports: [UserMetadataModule],
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

  const userId1 = "0f5d0b13-8d72-46c9-a7c4-c1f7e5aa1f17";
  const userId2 = "0f82ac61-9801-488f-babb-3c2d23a413d0";
  describe("UserMetadataController createOrUpdateUserMetadata()", () => {
    it("should create or update user1 metadata", async () => {

      const response = await pactum
        .spec()
        .post("/user-metadata/" + userId1)
        .expectStatus(200)
        .expectBodyContains(userId1);
    });
  });

  describe("UserMetadataController createOrUpdateUserMetadata()", () => {
    it("should create or update user2 metadata", async () => {

      const response = await pactum
        .spec()
        .post("/user-metadata/" + userId2)
        .expectStatus(200)
        .expectBodyContains(userId2);
    });
  });

  describe("UserMetadataController findUserMetadata()", () => {
    it("should get user1 metadata by ID", async () => {

      const response = await pactum
        .spec()
        .get("/user-metadata/" + userId1)
        .expectStatus(200)
        .expectBodyContains(userId1);
    });
  });

  describe("UserMetadataController findManyUserMetadata()", () => {
    it("should get all user metadata", async () => {
      const response = await pactum
        .spec()
        .get("/user-metadata")
        .expectStatus(200)
        .expectBodyContains(userId1)
        .expectBodyContains(userId2)

      const userMetadata = JSON.parse(JSON.stringify(response.body));
      
    });
  });

  describe("UserMetadataController deleteUserMetadata()", () => {
    it("should delete user1 metadata by ID", async () => {

      const response = await pactum
        .spec()
        .delete("/user-metadata/" + userId1)
        .expectStatus(200)
        .expectBodyContains(userId1);
    });
  });

  describe("UserMetadataController deleteUserMetadata()", () => {
    it("should delete user2 metadata by ID", async () => {

      const response = await pactum
        .spec()
        .delete("/user-metadata/" + userId2)
        .expectStatus(200)
        .expectBodyContains(userId2);
    });
  });

  describe("UserMetadataController findManyUserMetadata()", () => {
    it("should get all user metadata", async () => {
      const response = await pactum
        .spec()
        .get("/user-metadata")
        .expectStatus(200)

      const userMetadata = JSON.parse(JSON.stringify(response.body));

      expect(userMetadata).toStrictEqual({"data": [], "message": "UserMetadata(s) fetched successfully"});
      
    });
  });
});
