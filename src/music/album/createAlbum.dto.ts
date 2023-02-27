import { IsNotEmpty, IsOptional, ValidateNested } from "class-validator";
import { Type } from 'class-transformer';
import { AddExistingSongsToCollectionDto } from "../playlist/addExistingSongsToCollection.dto";
import { AutoMap } from "@automapper/classes";
import { AddExistingArtistDto } from "../artist/addExistingArtistDto.dto";

export class CreateAlbumDto{
    @AutoMap()
    @IsNotEmpty()
    name: string;

    // @AutoMap()
    @IsNotEmpty()
    @ValidateNested()
    songIds: AddExistingSongsToCollectionDto[];

    @AutoMap()
    @IsNotEmpty()
    released_at: Date;
    
    @AutoMap()
    @IsOptional()
    description: string;

    // @AutoMap()
    // @IsOptional()
    // artistIds: string;
    @AutoMap()
    @IsOptional()
    artistIds: AddExistingArtistDto[];

    // @IsOptional()
    // @Type(() => CreateGenreDto)
    // @ValidateNested()
    // genres: CreateGenreDto[];

    // @IsOptional()
    // genreIds: number[];
}