import { IsDate, IsNotEmpty, IsOptional } from 'class-validator';
import { CreateGenreDto } from "../genre/createGenre.dto";
import { AddExistingArtistDto } from '../artist/addExistingArtistDto.dto';

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
    artistIds: AddExistingArtistDto[];

    @IsOptional()
    genres: CreateGenreDto[];

    @IsOptional()
    genreIds: number[];
}