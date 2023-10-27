import { Test, TestingModule } from "@nestjs/testing";
import { MockLevelService } from "./mock-level.service";
import { PrismaService } from "../../prisma/prisma.service";
import { CreateMockLevelDto } from "./dto/create-mock-level.dto";
import { UpdateMockLevelDto } from "./dto/update-mock-level.dto";

import { NotFoundException } from "@nestjs/common";

describe("MockLevelService", () => {
  let service: MockLevelService;
  let prismaService: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MockLevelService, PrismaService],
    }).compile();

    service = module.get<MockLevelService>(MockLevelService);
    prismaService = module.get<PrismaService>(PrismaService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });

  describe("create", () => {
    it("should create a new mock level", async () => {
      const createMockLevelDto: CreateMockLevelDto = {
        label: "Test Level",
        description: "Test Description",
      };

        const mockLevel = {
            id: 1024567893,
            label: 'Test Level',
            description: 'Test Description'
      }; // Define a mock response from the database

      jest.spyOn(prismaService.level, "create").mockResolvedValue(mockLevel);

      const result = await service.create(createMockLevelDto);

      expect(result).toEqual(mockLevel);
    });
  });

  describe("findAll", () => {
    it("should return an array of mock levels", async () => {
        const mockLevels = [
            { id: 1, label: "test", description: "test" },
            { id: 2, label: "test2", description: "test2" },
        ];

      jest.spyOn(prismaService.level, "findMany").mockResolvedValue(mockLevels);

      const result = await service.findAll();

      expect(result).toEqual(mockLevels);
    });
  });

  describe("findOne", () => {
    it("should return a single mock level by ID", async () => {
      const mockLevelId = 1;
        const mockLevel = {
            id: 1,
            label: "test",
            description: "test"
      }; // Define a mock response from the database

      jest
        .spyOn(prismaService.level, "findUnique")
        .mockResolvedValue(mockLevel);

      const result = await service.findOne(mockLevelId);

      expect(result).toEqual(mockLevel);
    });

    it("should throw NotFoundException for non-existent ID", async () => {
      const mockLevelId = 999; // Assuming this ID does not exist
      jest.spyOn(prismaService.level, "findUnique").mockResolvedValue(null);

      await expect(service.findOne(mockLevelId)).rejects.toThrowError(
        NotFoundException
      );
    });
  });

  describe("update", () => {
    it("should update a mock level by ID", async () => {
      const mockLevelId = 1;
      const updateMockLevelDto: UpdateMockLevelDto = {
        label: "Updated Label",
        description: "Updated Description",
      };

        const mockLevel = {
            id: 1,
            label: 'Updated Label',
            description: 'Updated Description'
      }; // Define a mock response from the database

      jest.spyOn(prismaService.level, "update").mockResolvedValue(mockLevel);

      const result = await service.update(mockLevelId, updateMockLevelDto);

      expect(result).toEqual(mockLevel);
    });
  });

  describe("remove", () => {
    it("should delete a mock level by ID", async () => {
      const mockLevelId = 1;
        const mockLevel = {
            id: 1,
            label: '',
            description: ''
      }; // Define a mock response from the database

      jest.spyOn(prismaService.level, "delete").mockResolvedValue(mockLevel);

      const result = await service.remove(mockLevelId);

      expect(result).toEqual(mockLevel);
    });
  });
});
