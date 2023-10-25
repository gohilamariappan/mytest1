import {
  Controller,
  Post,
  Logger,
  HttpStatus,
  UseInterceptors,
  UploadedFile,
  Res,
} from "@nestjs/common";
import { FileUploadService } from "./file-upload.service";
import { CreateFileUploadDto } from "./dto/create-file-upload.dto";
import { UpdateFileUploadDto } from "./dto/update-file-upload.dto";
import {
  ApiBody,
  ApiConsumes,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from "@nestjs/swagger";
import { FileInterceptor } from "@nestjs/platform-express";
import { multerOptions } from "src/config/multer-options.config";
import { getPrismaErrorStatusAndMessage } from "src/utils/utils";

@Controller("file-upload")
@ApiTags("file-upload")
export class FileUploadController {
  // Create a logger instance for this controller to log events and errors.
  private readonly logger = new Logger(FileUploadController.name);

  // The fileupload controller injecting the FileUpload service into it
  constructor(private readonly fileUploadService: FileUploadService) {}

  @Post()
  @UseInterceptors(FileInterceptor("file", multerOptions))
  @ApiConsumes("multipart/form-data") // Specify content type as multipart/form-data
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string' || 'number',
          format : 'binary'
        }
      }
    }
  })
  async uploadQuestions(@UploadedFile() file, @Res() res) {
    // Log the initiaton for csv file upload
    this.logger.log(`Initiate to upload a csv file.`);
    try {
      // Parsed the uploaded data
      const parsedData = await this.fileUploadService.parseCSV(file.path);
      // Store the parsedData in the db
      await this.fileUploadService.storeData(parsedData);
      // Clean up after the sucessful upload of csv data
      await this.fileUploadService.deleteUploadedFile(file.path);
      // Log the successful upload of the question bank.
      this.logger.log(`Successfully uploaded question bank.`);
      return res.status(HttpStatus.CREATED).json({
        message: "Question bank uploaded sucessfully.",
      });
    } catch (error) {
      this.logger.error(`Failed to upload question bank.`, error);
      // get error message and status code
      const { errorMessage, statusCode } =
        getPrismaErrorStatusAndMessage(error);
      // Return an error response
      return res.status(statusCode).json({
        statusCode,
        message: errorMessage || `Failed to upload question bank.`,
      });
    }
  }
}
