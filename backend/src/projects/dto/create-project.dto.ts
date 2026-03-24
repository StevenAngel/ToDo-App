// Class-validator zum validieren von verschiedenen Daten. Nest.js prüft die eingestellten decorator (wenn ValidationPipe aktiv)
import { IsString, IsOptional, IsNotEmpty, IsArray } from "class-validator";
import { CreateTodoDto } from "src/todos/dto/create-todo.dto";

export class CreateProjectDto {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsString()
    @IsOptional()
    description: string;

    // IsOptional, weil IsNotEmpty err 400 werfen würde, wenn noch keine todos im project (leeres array) 
    @IsArray()
    @IsOptional()
    todos: Array<CreateTodoDto>
}
