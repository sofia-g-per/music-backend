import { IsNotEmpty, IsOptional, ValidateNested } from "class-validator";
import { CreateGenreDto } from "../genre/createGenre.dto";
import { Type } from "class-transformer";
import { AddExistingSongsToCollectionDto } from "./addExistingSongsToCollection.dto";

export class CreatePlaylistDto{
    @IsNotEmpty()
    name: string;

    //добавить информацию о порядке песен
    @IsNotEmpty()
    // @Type(() => CreateGenreDto)
    // @ValidateNested()
    // songIds: AddExistingSongsToCollectionDto[];
    // для работы с постманом
    songIds: string;

    @IsNotEmpty()
    isPublic: boolean;
    
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