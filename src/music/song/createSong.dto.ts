import { IsDate, IsNotEmpty, IsOptional } from 'class-validator';
import { Genre } from '../genre/genre.entity';
import { CreateGenreDto } from "../genre/createGenre.dto";


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

    @IsOptional()
    artistIds: number[];

    @IsOptional()
    genres: CreateGenreDto[];

    @IsOptional()
    genreIds: number[];
}