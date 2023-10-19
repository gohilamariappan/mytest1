import { IsBoolean, IsDate, IsInt, IsJSON, IsNotEmpty, IsOptional, IsString, IsUUID } from "class-validator";
import { ResponseSurveyFormDto } from "src/survey-form/dto";

export class ResponseUserMetadataDto {
    
    readonly userId: string;
    readonly designation?: string | null;
    readonly departmentId: number;
    readonly isAdmin: boolean;
    readonly isNewEmployee: boolean;
    readonly dateOfJoining: Date;
    readonly SurveyForms?: ResponseSurveyFormDto[]
}