import { IsDateString, IsEnum, IsInt, IsNotEmpty, IsOptional, IsPositive, IsString } from "class-validator";
import { Importance } from "../enums/importance.enum";

export class CreateTodoDto {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsString()
    @IsOptional()
    description: string;

    @IsEnum(Importance)
    @IsNotEmpty()
    importance: Importance;

    // IsDateString für JSON Dates, IsDate funktioniert nicht immer mit JSON
    @IsDateString()
    @IsOptional()
    deadline: Date;

    // IsInt für ganze zahlen, IsNumber für komma zahlen
    @IsInt()
    @IsPositive()
    @IsNotEmpty()
    projectId: number;
}
