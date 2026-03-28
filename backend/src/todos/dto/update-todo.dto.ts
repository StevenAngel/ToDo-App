import { PartialType } from '@nestjs/mapped-types';
import { CreateTodoDto } from './create-todo.dto';
import { IsDateString, IsEnum, IsInt, IsNotEmpty, IsOptional, IsPositive, IsString } from "class-validator";
import { Importance } from '../enums/priority.enum';

// Wenn PartialType(dto) leer ist, darf alles geändert werden. Hier dürfen nur name, description, importance und deadline geändert werden, aber nicht die projectId.
export class UpdateTodoDto extends PartialType(CreateTodoDto) {
        @IsString()
        @IsNotEmpty()
        name: string;
    
        @IsString()
        @IsOptional()
        description: string;
    
        @IsEnum(Importance)
        @IsNotEmpty()
        importance: Importance;
    
        @IsDateString()
        @IsOptional()
        deadline: Date;
}
