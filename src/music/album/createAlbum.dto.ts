import { IsNotEmpty, IsOptional, ValidateNested } from "class-validator";
import { CreateGenreDto } from "../genre/createGenre.dto";
import { Type } from 'class-transformer';

export class CreateAlbumDto{
    @IsNotEmpty()
    name: string;

    @IsNotEmpty()
    //для постмана
    songIds: string;

    @IsNotEmpty()
    released_at: Date;
    
    @IsOptional()
    description: string;

    @IsOptional()
    artistIds: number[];

    @IsOptional()
    @Type(() => CreateGenreDto)
    @ValidateNested()
    genres: CreateGenreDto[];

    @IsOptional()
    genreIds: number[];
}