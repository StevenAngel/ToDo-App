import { PartialType } from '@nestjs/mapped-types';
import { CreateTodoDto } from './create-todo.dto';
import { IsArray, IsBoolean, IsDateString, IsEnum, IsInt, IsNotEmpty, IsOptional, IsPositive, IsString } from "class-validator";
import { Priority } from '../enums/priority.enum';

// Wenn PartialType(dto) leer ist, darf alles geändert werden. Hier dürfen nur name, description, importance und deadline geändert werden, aber nicht die projectId.
export class UpdateTodoDto extends PartialType(CreateTodoDto) {
        // Alles im updateDto ist optional, da man nur teilweise einzelne felder ändern möchte
        @IsString()
        @IsOptional()
        name: string;

        @IsString()
        @IsOptional()
        description: string;

        @IsEnum(Priority)
        @IsOptional()
        priority: Priority;

        @IsDateString()
        @IsOptional()
        deadline: Date;

        @IsArray()
        @IsString({ each: true })
        @IsOptional()
        categories: Array<string>;

        @IsBoolean()
        @IsOptional()
        isDone: boolean;
}
