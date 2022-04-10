import { IsNotEmpty, IsOptional, ValidateNested } from "class-validator";

export class CreateGenreDto{
    @IsNotEmpty()
    name: string;

    @IsOptional()
    description: string;
}