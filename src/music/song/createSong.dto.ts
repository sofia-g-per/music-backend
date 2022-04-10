import { IsDate, IsNotEmpty, IsOptional } from 'class-validator';
import { Genre } from '../genre/genre.entity';
import { CreateGenreDto } from "../genre/createGenre.dto";


export class CreateSongDto {  
    @IsNotEmpty()
    name: string; 

    // @IsNotEmpty()
    @IsOptional()
    file_path: string;

    @IsDate()
    released_at: Date;

    @IsOptional()
    description: string;

    @IsOptional()
    lyrics: string;

    @IsOptional()
    artist_ids: number[];

    @IsOptional()
    genres: CreateGenreDto[];

    @IsOptional()
    genre_ids: number[];
}