import * as pactum from "pactum";
import { PrismaService } from "../prisma/prisma.service";
import { Test, TestingModule } from "@nestjs/testing";
import { ConfigService } from "@nestjs/config";
import { INestApplication, ValidationPipe } from "@nestjs/common";
import { AdminDepartmentModule } from "./admin-department.module";
import { ResponseAdminDepartmentDto } from "./dto/response-admin-department.dto";

describe("AdminDepartment e2e", () => {
  let app: INestApplication;
  let prisma: PrismaService;
  let module: TestingModule;
  beforeAll(async () => {
    module = await Test.createTestingModule({
      imports: [AdminDepartmentModule],
    }).compile();
    app = module.createNestApplication();
    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
      })
    );
    const configService = module.get<ConfigService>(ConfigService);
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

  describe("AdminDepartmentController createOrUpdateAdminDepartment()", () => {
    it("should return created or updated admin department", async function () {
      const testData = {
        departmentId: 1,
      };
      const response = await pactum
        .spec()
        .post(`/admin-department/${testData.departmentId}`)
        .withPathParams({ departmentId: testData.departmentId })
        .expectStatus(201);
      const createdAdminDepartment = JSON.parse(response);
      expect(createdAdminDepartment).toMatchObject(ResponseAdminDepartmentDto);
    });
  });

  describe("AdminDepartmentController getAllAdminDepartment()", () => {
    it("should return all admin departments", async function () {
      const response = await pactum.spec().get("/admin-departments");
      const allAdminDepartments = JSON.parse(response);
      expect(allAdminDepartments[0]).toMatchObject(ResponseAdminDepartmentDto);
    });
  });
});
