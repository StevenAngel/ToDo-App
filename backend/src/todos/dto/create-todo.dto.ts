import { IsArray, IsBoolean, IsDateString, IsEnum, IsNotEmpty, IsOptional, IsString } from "class-validator";
import { Priority } from "../enums/priority.enum";

export class CreateTodoDto {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsString()
    @IsOptional()
    description: string;

    @IsEnum(Priority)
    @IsNotEmpty()
    priority: Priority;

    // IsDateString für JSON Dates, IsDate funktioniert nicht immer mit JSON
    @IsDateString()
    @IsOptional()
    deadline: Date;

    @IsArray()
    @IsString({ each: true })
    @IsOptional()
    categories: Array<string>;

    @IsBoolean()
    @IsNotEmpty()
    isDone: boolean;
    // IsInt für ganze zahlen, IsNumber für komma zahlen
    // @IsInt()
    // @IsPositive()
    // @IsNotEmpty()
    // projectId: number;
}
