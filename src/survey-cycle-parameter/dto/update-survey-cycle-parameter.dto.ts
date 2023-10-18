import { PartialType } from "@nestjs/swagger";
import { CreateSurveyCycleParameterDto } from "./create-survey-cycle-parameter.dto";

export class UpdateSurveyCycleParameterDto extends PartialType(
  CreateSurveyCycleParameterDto
) {}
