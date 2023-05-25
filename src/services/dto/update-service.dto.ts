import { PartialType } from "@nestjs/mapped-types";
import { CreateServicesDto } from "./create-service.dto";
import { IsMilitaryTime, IsNotEmpty, IsNumber, Max, Min } from "class-validator";

export class UpdateServicesDto extends PartialType(CreateServicesDto) {
  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  @Max(6)
  day: number;

  @IsNotEmpty()
  @IsMilitaryTime()
  time: string;
}