import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Res,
  HttpStatus,
  ParseIntPipe,
} from "@nestjs/common";
import { MockDepartmentService } from "./mock-department.service";
import { CreateDepartmentDto } from "./dto/create-mock-department.dto";
import { UpdateDepartmentDto } from "./dto/update-mock-department.dto";
import { ApiTags } from "@nestjs/swagger";

@Controller("department")
@ApiTags("mockFracService/department")
export class MockDepartmentController {
  constructor(private readonly mockDepartmentService: MockDepartmentService) {}

  @Post()
  async create(@Body() createDepartmentDto: CreateDepartmentDto, @Res() res) {
    try {
      const department = await this.mockDepartmentService.create(createDepartmentDto);
      return res
        .status(HttpStatus.OK)
        .json({ data: department, message: "Successfully done" });
    } catch (error) {
      return res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json({ message: error.meta.cause });
    }
  }

  @Get()
  async findAll(@Res() res) {
    try {
      const department = await this.mockDepartmentService.findAll();
      return res
        .status(HttpStatus.OK)
        .json({ data: department, message: "Successfully done" });
    } catch (error) {
      return res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json({ message: error.meta.cause });
    }
  }

  @Get(":id")
  async findOne(@Param("id", ParseIntPipe) id: number, @Res() res) {
    try {
      const department = await this.mockDepartmentService.findOne(id);
      return res
        .status(HttpStatus.OK)
        .json({ data: department, message: "Successfully done" });
    } catch (error) {
      
      return res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json({ message: error.message });
    }
  }

  @Patch(":id")
  async update(
    @Param("id", ParseIntPipe) id: number,
    @Body() updateDepartmentDto: UpdateDepartmentDto,
    @Res() res
  ) {
    try {
      const department = await this.mockDepartmentService.update(id, updateDepartmentDto);
      return res
        .status(HttpStatus.OK)
        .json({ data: department, message: "Successfully done" });
    } catch (error) {
      return res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json({ message: error.meta.cause });
    }
  }

  @Delete(":id")
  async remove(@Param("id", ParseIntPipe) id: number, @Res() res) {
    try {
      const department = await this.mockDepartmentService.remove(id);
      return res
        .status(HttpStatus.OK)
        .json({ data: department, message: "Successfully done" });
    } catch (error) {
      return res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json({ message: error.meta.cause });
    }
  }
}
