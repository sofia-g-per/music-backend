import { IsDate, IsNotEmpty, IsOptional } from 'class-validator';
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

    @IsOptional()
    artistIds: AddExistingArtistDto[];

    @AutoMap(()=>[CreateGenreDto])
    @IsOptional()
    genres: CreateGenreDto[];

    @IsOptional()
    genreIds: number[];
}