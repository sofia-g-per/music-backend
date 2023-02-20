import { IsNotEmpty, IsOptional, ValidateNested } from "class-validator";
import { CreateGenreDto } from "../genre/createGenre.dto";
import { Type } from "class-transformer";
import { AddExistingSongsToCollectionDto } from "./addExistingSongsToCollection.dto";
import { AutoMap } from "@automapper/classes";

export class CreatePlaylistDto{
    @AutoMap()
    @IsNotEmpty()
    name: string;

    @AutoMap()
    @IsNotEmpty()
    @Type(() => AddExistingSongsToCollectionDto)
    @ValidateNested()
    songIds: AddExistingSongsToCollectionDto[];

    @AutoMap()
    @IsNotEmpty()
    isPublic: boolean;
    
    @AutoMap()
    @IsOptional()
    description: string;

    @AutoMap()
    @IsOptional()
    coverImg: string;

    // @AutoMap()
    // @IsOptional()
    // @Type(() => CreateGenreDto)
    // @ValidateNested()
    // genres: CreateGenreDto[];

    // @AutoMap()
    // @IsOptional()
    // genreIds: number[];
}