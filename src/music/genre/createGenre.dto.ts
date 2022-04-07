import { IsNotEmpty, IsOptional, ValidateNested } from "class-validator";
import { CreateArtistDto } from "../artist/createArtist.dto";
import { Type } from "class-transformer";

export class CreateGenreDto{
    @IsNotEmpty()
    name: string;

    @IsOptional()
    description: string;
}