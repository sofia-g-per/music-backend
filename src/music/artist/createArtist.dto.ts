import { IsEmpty, IsNotEmpty, IsOptional, ValidateNested} from "class-validator";
import { Genre } from "../genre/genre.entity";
import { Type } from "class-transformer";

export class CreateArtistDto {

    @IsNotEmpty()
    stagename: string;

    @IsOptional()
    description: string;

    @IsOptional()
    @Type(() => Genre)
    @ValidateNested()
    genres: Genre[];

    @IsEmpty()
    userId: number;

}