import { IsNotEmpty, IsOptional, ValidateNested } from "class-validator";
import { CreateGenreDto } from "../genre/createGenre.dto";
import { Type } from "class-transformer";
import { AddExistingSongsToCollectionDto } from "./addExistingSongsToCollection.dto";

export class CreatePlaylsitDto{
    @IsNotEmpty()
    name: string;

    //добавить информацию о порядке песен
    @IsNotEmpty()
    songIds: AddExistingSongsToCollectionDto[];
    
    @IsOptional()
    description: string;

    @IsOptional()
    coverImg: string;

    @IsOptional()
    @Type(() => CreateGenreDto)
    @ValidateNested()
    genres: CreateGenreDto[];

    @IsOptional()
    genreIds: number[];
}