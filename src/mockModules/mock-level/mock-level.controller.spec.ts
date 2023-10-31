import { Test, TestingModule } from "@nestjs/testing";
import { MockLevelController } from "./mock-level.controller";
import { MockLevelService } from "./mock-level.service";
import { CreateMockLevelDto } from "./dto/create-mock-level.dto";
import { UpdateMockLevelDto } from "./dto/update-mock-level.dto";
import { NotFoundException } from "@nestjs/common";

describe("MockLevelController", () => {
  let controller: MockLevelController;
  let mockLevelService: MockLevelService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MockLevelController],
      providers: [MockLevelService],
    }).compile();

    controller = module.get<MockLevelController>(MockLevelController);
    mockLevelService = module.get<MockLevelService>(MockLevelService);
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });

  describe("create", () => {
    it("should create a new mock level", async () => {
      const createMockLevelDto: CreateMockLevelDto = {
        levelNumber: 1,
        description: "Test Description",
      };

      const mockLevel = {
        id: 1,
        levelNumber: 1,
        description: "Test description",
      }; // Define a mock response from the service

      // Create mock request objects
      const req = {} as Request;

      jest.spyOn(mockLevelService, "create").mockResolvedValue(mockLevel);

      const result = await controller.create(req, createMockLevelDto);

      expect(result).toEqual({ data: mockLevel, message: "Successfully done" });
    });
  });

  describe("findAll", () => {
    it("should return an array of mock levels", async () => {
      const mockLevels = [
        /* Define an array of mock levels */
      ];

      jest.spyOn(mockLevelService, "findAll").mockResolvedValue(mockLevels);

      // Create mock request objects
      const req = {} as Request;

      const result = await controller.findAll(req);

      expect(result).toEqual({
        data: mockLevels,
        message: "Successfully done",
      });
    });
  });

  describe("findOne", () => {
    it("should return a single mock level by ID", async () => {
      const mockLevelId = 1;
      const mockLevel = {
        /* Define one or more properties for this object*/
        id: 1,
        levelNumber: 1,
        description: "this is test description",
      }; // Define a mock response from the service

      jest.spyOn(mockLevelService, "findOne").mockResolvedValue(mockLevel);

      // Create mock request objects
      const req = {} as Request;

      const result = await controller.findOne(req, mockLevelId);

      expect(result).toEqual({ data: mockLevel, message: "Successfully done" });
    });

    it("should handle NotFoundException for non-existent ID", async () => {
      const mockLevelId = 999; // Assuming this ID does not exist
      jest
        .spyOn(mockLevelService, "findOne")
        .mockRejectedValue(new NotFoundException());

      // Create mock request objects
      const req = {} as Request;

      const result = await controller.findOne(req, mockLevelId);

      expect(result).toEqual({ message: "Level with id #999 not found" });
    });
  });

  describe("update", () => {
    it("should update a mock level by ID", async () => {
      const mockLevelId = 1;
      const updateMockLevelDto: UpdateMockLevelDto = {
        levelNumber: 1,
        description: "Updated Description",
      };

      const mockLevel = {
        id: mockLevelId,
        levelNumber: 1,
        description: "this is test description",
      }; // Define a mock response from the service

      jest.spyOn(mockLevelService, "update").mockResolvedValue(mockLevel);
      // Create mock request objects
      const req = {} as Request;
      const result = await controller.update(
        req,
        mockLevelId,
        updateMockLevelDto
      );

      expect(result).toEqual({ data: mockLevel, message: "Successfully done" });
    });
  });

  describe("remove", () => {
    it("should delete a mock level by ID", async () => {
      const mockLevelId = 1;
      const mockLevel = {
        id: mockLevelId,
        levelNumber: 1,
        description: "test",
      }; // Define a mock response from the service

      jest.spyOn(mockLevelService, "remove").mockResolvedValue(mockLevel);
      // Create mock request objects
      const req = {} as Request;
      const result = await controller.remove(req, mockLevelId);

      expect(result).toEqual({ data: mockLevel, message: "Successfully done" });
    });
  });
});
