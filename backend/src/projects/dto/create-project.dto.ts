// Class-validator zum validieren von verschiedenen Daten. Nest.js prüft die eingestellten decorator (wenn ValidationPipe aktiv)
import { IsString, IsOptional, IsNotEmpty } from "class-validator";

export class CreateProjectDto {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsString()
    @IsOptional()
    description: string;
}
