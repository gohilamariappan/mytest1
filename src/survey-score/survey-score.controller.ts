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
  Logger,
  ParseIntPipe,
} from "@nestjs/common";
import { SurveyScoreService } from "./survey-score.service";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import {
  CreateSurveyScoreDto,
  SurveyScoreMultipleResponseDto,
  SurveyScoreResponseDto,
  UpdateSurveyScoreDto,
} from "./dto";
import { getPrismaErrorStatusAndMessage } from "src/utils/utils";

@Controller("survey-score")
@ApiTags("survey-score")
export class SurveyScoreController {
  private logger = new Logger(SurveyScoreController.name);
  constructor(private readonly surveyScoreService: SurveyScoreService) {}

  @Post()
  @ApiOperation({ summary: "create new survey score" })
  @ApiResponse({ status: HttpStatus.CREATED, type: SurveyScoreResponseDto })
  async create(
    @Res() res,
    @Body() createSurveyScoreDto: CreateSurveyScoreDto
  ): Promise<SurveyScoreResponseDto> {
    try {
      this.logger.log(`Initiated creating new survey score`);

      const surveyScore = await this.surveyScoreService.create(
        createSurveyScoreDto
      );

      this.logger.log(`Successfully created new survey score`);

      return res.status(HttpStatus.CREATED).json({
        data: surveyScore,
        message: `Successfully created survey score`,
      });
    } catch (error) {
      this.logger.error(`Failed to create new survey score`, error);

      const { errorMessage, statusCode } =
        getPrismaErrorStatusAndMessage(error);

      return res.status(statusCode).json({
        statusCode,
        message: errorMessage || `Failed to create survey score`,
      });
    }
  }

  @Get()
  @ApiOperation({ summary: "get all survey score" })
  @ApiResponse({ status: HttpStatus.OK, type: SurveyScoreMultipleResponseDto })
  async findAll(@Res() res): Promise<SurveyScoreMultipleResponseDto> {
    try {
      this.logger.log(`Initiated fetching all survey scores`);

      const surveyScore = await this.surveyScoreService.findAll();

      this.logger.log(`Successfully fetched all survey scores`);

      return res.status(HttpStatus.OK).json({
        data: surveyScore,
        message: `Successfully fetched all survey scores`,
      });
    } catch (error) {
      this.logger.error(`Failed to fetch all survey score`, error);

      const { errorMessage, statusCode } =
        getPrismaErrorStatusAndMessage(error);

      return res.status(statusCode).json({
        statusCode,
        message: errorMessage || `Failed to fetch all survey score`,
      });
    }
  }

  @Get("survey-form/:surveyFormId")
  @ApiOperation({ summary: "get survey scores by surveyFormId" })
  @ApiResponse({ status: HttpStatus.OK, type: SurveyScoreMultipleResponseDto })
  async findBySurveyFormId(
    @Res() res,
    @Param("surveyFormId", ParseIntPipe) surveyFormId: number
  ): Promise<SurveyScoreMultipleResponseDto> {
    try {
      this.logger.log(
        `Initiated fetching survey score with surveyFormId #${surveyFormId}`
      );

      const surveyScore = await this.surveyScoreService.findBySurveyFormId(
        surveyFormId
      );

      this.logger.log(
        `Successfully fetched survey score with surveyFormId #${surveyFormId}`
      );

      return res.status(HttpStatus.OK).json({
        data: surveyScore,
        message: `Successfully fetched survey score with surveyFormId #${surveyFormId}`,
      });
    } catch (error) {
      this.logger.error(
        `Failed to fetch survey score for surveyFormId #${surveyFormId}`,
        error
      );

      const { errorMessage, statusCode } =
        getPrismaErrorStatusAndMessage(error);

      return res.status(statusCode).json({
        statusCode,
        message:
          errorMessage ||
          `Failed to fetch survey score for surveyFormId #${surveyFormId}`,
      });
    }
  }

  @Get("user/:userId")
  @ApiOperation({ summary: "get survey score by user Id" })
  @ApiResponse({ status: HttpStatus.OK, type: SurveyScoreMultipleResponseDto })
  async findByUserId(
    @Res() res,
    @Param("userId", ParseIntPipe) userId: number
  ): Promise<SurveyScoreMultipleResponseDto> {
    try {
      this.logger.log(`Initiated fetching survey score with userId #${userId}`);

      const surveyScore = await this.surveyScoreService.findByUserId(userId);

      this.logger.log(
        `Successfully fetched survey score with userId #${userId}`
      );

      return res.status(HttpStatus.OK).json({
        data: surveyScore,
        message: `Successfully fetched survey score with userId #${userId}`,
      });
    } catch (error) {
      this.logger.error(
        `Failed to fetch survey score for userId #${userId}`,
        error
      );

      const { errorMessage, statusCode } =
        getPrismaErrorStatusAndMessage(error);

      return res.status(statusCode).json({
        statusCode,
        message:
          errorMessage || `Failed to fetch survey score for userId #${userId}`,
      });
    }
  }

  @Get(":id")
  @ApiOperation({ summary: "get survey score by id" })
  @ApiResponse({ status: HttpStatus.OK, type: SurveyScoreResponseDto })
  async findOne(
    @Res() res,
    @Param("id", ParseIntPipe) id: number
  ): Promise<SurveyScoreResponseDto> {
    try {
      this.logger.log(`Initiated fetching survey score with id #${id}`);

      const surveyScore = await this.surveyScoreService.findOne(id);

      this.logger.log(`Successfully fetched survey score with id #${id}`);

      return res.status(HttpStatus.OK).json({
        data: surveyScore,
        message: `Successfully fetched survey score with id #${id}`,
      });
    } catch (error) {
      this.logger.error(`Failed to fetch survey score for id #${id}`, error);

      const { errorMessage, statusCode } =
        getPrismaErrorStatusAndMessage(error);

      return res.status(statusCode).json({
        statusCode,
        message: errorMessage || `Failed to fetch survey score for id #${id}`,
      });
    }
  }

  @Patch(":id")
  @ApiOperation({ summary: "update survey score by id" })
  @ApiResponse({ status: HttpStatus.OK, type: SurveyScoreResponseDto })
  async update(
    @Res() res,
    @Param("id", ParseIntPipe) id: number,
    @Body() updateSurveyScoreDto: UpdateSurveyScoreDto
  ): Promise<SurveyScoreResponseDto> {
    try {
      this.logger.log(`Initiated updating survey score with id #${id}`);

      const surveyScore = await this.surveyScoreService.update(
        id,
        updateSurveyScoreDto
      );

      this.logger.log(`Successfully updated survey score with id #${id}`);

      return res.status(HttpStatus.OK).json({
        data: surveyScore,
        message: `Successfully updated survey score with id #${id}`,
      });
    } catch (error) {
      this.logger.error(`Failed to update survey score with id #${id}`, error);

      const { errorMessage, statusCode } =
        getPrismaErrorStatusAndMessage(error);

      return res.status(statusCode).json({
        message:
          errorMessage || `Failed to update survey score with id #${id} `,
      });
    }
  }

  @Delete(":id")
  @ApiOperation({ summary: "delete survey score by id" })
  @ApiResponse({ status: HttpStatus.OK, type: SurveyScoreResponseDto })
  async remove(
    @Res() res,
    @Param("id", ParseIntPipe) id: number
  ): Promise<SurveyScoreResponseDto> {
    try {
      this.logger.log(`Initiated deleting survey score with id #${id}`);

      const surveyScore = await this.surveyScoreService.remove(id);

      this.logger.log(`Successfully deleted survey score with id #${id}`);

      return res.status(HttpStatus.OK).json({
        data: surveyScore,
        message: `Successfully deleted survey score with id #${id}`,
      });
    } catch (error) {
      this.logger.error(`Failed to delete survey score with id #${id}`, error);

      const { errorMessage, statusCode } =
        getPrismaErrorStatusAndMessage(error);

      return res.status(statusCode).json({
        message:
          errorMessage || `Failed to delete survey score with id #${id} `,
      });
    }
  }
}
