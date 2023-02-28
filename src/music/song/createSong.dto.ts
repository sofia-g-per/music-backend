import { IsDate, IsNotEmpty, IsOptional, MaxDate, MinDate } from 'class-validator';
import { CreateGenreDto } from "../genre/createGenre.dto";
import { AddExistingArtistDto } from '../artist/addExistingArtistDto.dto';
import { AutoMap } from '@automapper/classes';

export class CreateSongDto {  
    @AutoMap()
    @IsNotEmpty()
    name: string; 

    @AutoMap()
    @IsOptional()
    description: string;

    @AutoMap()
    @IsOptional()
    lyrics: string;

    @AutoMap()
    @IsOptional()
    coverImg: string;

    @IsOptional()
    artistIds: AddExistingArtistDto[];

    @AutoMap(()=>[CreateGenreDto])
    @IsOptional()
    genres: CreateGenreDto[];

    @IsOptional()
    genreIds: number[];

    @AutoMap()
    @IsOptional()
    @IsDate()
    @MinDate(new Date(1900, 1, 1))
    @MaxDate(new Date())
    releasedAt: Date;
}