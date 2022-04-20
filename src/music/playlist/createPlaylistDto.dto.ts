import { IsNotEmpty, IsOptional, ValidateNested } from "class-validator";
import { CreateGenreDto } from "../genre/createGenre.dto";
import { Type } from "class-transformer";
import { AddExistingSongsToCollectionDto } from "./addExistingSongsToCollection.dto";

export class CreatePlaylistDto{
    @IsNotEmpty()
    name: string;

    @IsNotEmpty()
    @Type(() => AddExistingSongsToCollectionDto)
    @ValidateNested()
    songIds: AddExistingSongsToCollectionDto[];

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