import { IsDate, IsNotEmpty, IsOptional } from 'class-validator';
import { Artist } from '../artist/artist.entity';
import { Genre } from '../genre/genre.entity';

export class CreateSongDto {  
    @IsNotEmpty()
    name: string; 

    // @IsNotEmpty()
    @IsOptional()
    file_path: string;

    @IsDate()
    released_at: Date;

    @IsOptional()
    artists: Artist[];

    @IsOptional()
    description: string;

    @IsOptional()
    lyrics: string;

    @IsOptional()
    genres: Genre[];
}