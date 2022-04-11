import { IsDate, IsNotEmpty, IsOptional } from 'class-validator';
import { Genre } from '../genre/genre.entity';
import { CreateGenreDto } from "../genre/createGenre.dto";
import { AddExistingArtistDto } from '../artist/addExistingArtistDto.dto copy';


export class CreateSongDto {  
    @IsNotEmpty()
    name: string; 

    @IsNotEmpty()
    // @IsDate()
    released_at: Date;

    @IsOptional()
    description: string;

    @IsOptional()
    lyrics: string;

    // @IsOptional()
    // artistIds: AddExistingArtistDto[];
    //для тестирования с постманом
    @IsOptional()
    artistIds;


    @IsOptional()
    genres: CreateGenreDto[];

    @IsOptional()
    genreIds: number[];
}