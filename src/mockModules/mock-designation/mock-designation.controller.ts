import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Patch,
  Post,
  Res,
} from "@nestjs/common";
import { MockDesignationService } from "./mock-designation.service";
import {
  CreateDesignationDto,
  ResponseDesignationDto,
  UpdateDesignationDto,
} from "./dto";
import { ApiTags } from "@nestjs/swagger";

@Controller("designation")
@ApiTags("mockFracService/designation")
export class MockDesignationController {
  constructor(private readonly designationService: MockDesignationService) {}

  @Post()
  async create(@Body() createDto: CreateDesignationDto, @Res() res) {
    try {
      const designation = await this.designationService.createDesignation(
        createDto
      );
      return res.status(HttpStatus.CREATED).json({
        data: designation,
        message: "Successfully created the Designation",
      });
    } catch (error) {
      return res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json({ message: error.meta.cause });
    }
  }

  @Get()
  async findAll(@Res() res): Promise<ResponseDesignationDto[]> {
    try {
      const designation = await this.designationService.findAllDesignations();
      return res.status(HttpStatus.FOUND).json({
        data: designation,
        message: "Successfully Fetched all the designations.",
      });
    } catch (error) {
      return res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json({ message: error.meta.cause });
    }
  }

  @Get(":id")
  async findOne(@Param("id") id: number, @Res() res) {
    try {
      const designation = await this.designationService.findDesignationById(id);
      return res.status(HttpStatus.FOUND).json({
        data: designation,
        message: "Successfully Fetched the designation.",
      });
    } catch (error) {
      return res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json({ message: error.meta.cause });
    }
  }

  @Patch(":id")
  async update(
    @Param("id") id: number,
    @Body() updateDto: UpdateDesignationDto,
    @Res() res
  ) {
    try {
      const designation = await this.designationService.updateDesignation(
        id,
        updateDto
      );
      return res.status(HttpStatus.OK).json({
        data: designation,
        message: "Successfully updated the designation.",
      });
    } catch (error) {
      return res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json({ message: error.meta.cause });
    }
  }

  @Delete(":id")
  async remove(@Param("id") id: number, @Res() res) {
    try {
      const designation = await this.designationService.removeDesignation(id);
      return res.status(HttpStatus.OK).json({
        data: designation,
        message: "Successfully deleted the designation.",
      });
    } catch (error) {
      return res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json({ message: error.meta.cause });
    }
  }

  @Post("addRoleToDesignation/:id")
  async addRoleToDesignation(@Param("id") id: number, @Res() res, @Body() {roleId}: any) {
    try {
      const designation = await this.designationService.addRoleToDesignation(id, roleId);
      return res.status(HttpStatus.OK).json({
        data: designation,
        message: `Successfully added role with id #${roleId} to the designation with id #${id}.`,
      });
    } catch (error) {
      return res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json({ message: error.meta.cause });
    }
  }
}
