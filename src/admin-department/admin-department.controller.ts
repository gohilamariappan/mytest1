import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Logger,
  HttpStatus,
  Res,
  Query,
  ParseIntPipe,
} from "@nestjs/common";
import { AdminDepartmentService } from "./admin-department.service";
import { FilterAdminDepartmentsDto } from "./dto/create-admin-department.dto";
import { UpdateAdminDepartmentDto } from "./dto/update-admin-department.dto";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { ResponseAdminDepartmentDto } from "./dto/response-admin-department.dto";
import { getPrismaErrorStatusAndMessage } from "src/utils/utils";

@Controller("admin-department")
@ApiTags("admin-department")
export class AdminDepartmentController {
  // Create a logger instance for this controller to log events and errors.
  private readonly logger = new Logger(AdminDepartmentController.name);

  // The Admin department controller class, injecting the Admin department service.
  constructor(
    private readonly adminDepartmentService: AdminDepartmentService
  ) {}

  // Api for creating a new admin department using departmentId
  @Post(":departmentId")
  @ApiOperation({ summary: "Create a new admin department" }) // Api operation for swagger
  @ApiResponse({ status: HttpStatus.CREATED, type: ResponseAdminDepartmentDto }) // Api response for the swagger
  async createAdminDepartment(
    @Res() res,
    @Param("departmentId", ParseIntPipe) departmentId: number
  ): Promise<ResponseAdminDepartmentDto> {
    try {
      // Log the initiation for the admin department creation
      this.logger.log(`Initiate to create a admin department`);

      const createdAdminDepartment =
        await this.adminDepartmentService.createAdminDepartment(departmentId);
      // Log the successful creation of the admin department
      this.logger.log(`Successfully created admin department.`);
      return res.status(HttpStatus.CREATED).json({
        message: "Admin department created sucessfully.",
        data: createdAdminDepartment,
      });
    } catch (error) {
      this.logger.error(`Failed to create new admin department.`, error);
      // get error message and status code
      const { errorMessage, statusCode } =
        getPrismaErrorStatusAndMessage(error);
      // Return an error response
      return res.status(statusCode).json({
        statusCode,
        message: errorMessage || `Failed to create new admin department.`,
      });
    }
  }

  // Api for getting all admin department
  @Get()
  @ApiOperation({ summary: "Fetch all admin departments." })
  @ApiResponse({
    status: HttpStatus.OK,
    type: ResponseAdminDepartmentDto,
    isArray: true,
  })
  async getAllAdminDepartment(
    @Res() res,
    @Query() filter: FilterAdminDepartmentsDto
  ): Promise<ResponseAdminDepartmentDto[]> {
    try {
      // Log the initiation for fetching all the admin department
      this.logger.log(`Initiated fetching all the admin department.`);
      const adminDepartments =
        await this.adminDepartmentService.getAllAdminDepartment(filter);

      // Log the successful fetching of data from db.
      this.logger.log(`Successfully fetched all admin department.`);

      // return the successful response for fetching the data from the db.
      return res.status(HttpStatus.OK).json({
        message: "Successfully fetched all admin department.",
        data: adminDepartments,
      });
    } catch (error) {
      // log the error message
      this.logger.error(`Failed to get all admin department.`, error);
      // get error message and status code
      const { errorMessage, statusCode } =
        getPrismaErrorStatusAndMessage(error);
      // Return an error response
      return res.status(statusCode).json({
        statusCode,
        message: errorMessage || `Failed to get all admin department.`,
      });
    }
  }

  // Api for updating the admin department
  @Patch("update/:id")
  @ApiOperation({ summary: "Update the admin department by Id." }) // Api operation for the swagger
  @ApiResponse({ status: HttpStatus.OK, type: ResponseAdminDepartmentDto }) // Api response for the swagger
  async updateAdminDepartmentById(
    @Res() res,
    @Param("id", ParseIntPipe) id: number,
    @Body() updateAdminDepartmentDto: UpdateAdminDepartmentDto
  ): Promise<ResponseAdminDepartmentDto> {
    try {
      // Log the initiation for updating the admin department for the given id
      this.logger.log(`Initiated updating the admin department for id #${id}`);
      // Update the admin department for the id
      const updateAdminDepartment =
        await this.adminDepartmentService.updateAdminDepartmentById(
          id,
          updateAdminDepartmentDto
        );
      // Log the successful update of the admin department with the given id
      this.logger.log(`Successfully updated admin department for id #${id}`);
      // Return response and statuscode for the successful update of the admin department
      return res.status(HttpStatus.OK).json({
        message: `Successfully updated admin department for id #${id}`,
        data: updateAdminDepartment,
      });
    } catch (error) {
      // Log the error
      this.logger.error(
        `Failed to update admin department for id #${id}`,
        error
      );

      const { errorMessage, statusCode } =
        getPrismaErrorStatusAndMessage(error); // get error message and status code

      // Return the response and status code for the failed update of the admin department
      return res.status(statusCode).json({
        statusCode,
        message:
          errorMessage || `Failed to update admin department for id #${id}`,
      });
    }
  }
}
