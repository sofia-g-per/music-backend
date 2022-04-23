import { IsNotEmpty, IsOptional, ValidateNested } from "class-validator";
import { CreateGenreDto } from "../genre/createGenre.dto";
import { Type } from 'class-transformer';
import { AddExistingSongsToCollectionDto } from "../playlist/addExistingSongsToCollection.dto";

export class CreateAlbumDto{
    @IsNotEmpty()
    name: string;

    @IsNotEmpty()
    @Type(() => AddExistingSongsToCollectionDto)
    @ValidateNested()
    songIds: AddExistingSongsToCollectionDto[];

    // @IsNotEmpty()
    // released_at: Date;
    
    @IsOptional()
    description: string;

    @IsOptional()
    // для постмана
    artistIds: string;

    @IsOptional()
    @Type(() => CreateGenreDto)
    @ValidateNested()
    genres: CreateGenreDto[];

    @IsOptional()
    genreIds: number[];
}