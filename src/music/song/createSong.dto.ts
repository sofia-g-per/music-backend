import { IsDate, IsNotEmpty, IsOptional, MaxDate, MinDate, ValidateNested } from 'class-validator';
import { CreateGenreDto } from "../genre/createGenre.dto";
import { AddExistingArtistDto } from '../artist/addExistingArtistDto.dto';
import { AutoMap } from '@automapper/classes';
import { Transform, Type } from 'class-transformer';
import { ContentStatus } from './contentStatus.entity';

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

    @AutoMap(()=>[AddExistingArtistDto])
    @IsOptional()
    @ValidateNested({ each: true })
    artists?: AddExistingArtistDto[];

    @AutoMap(()=>[CreateGenreDto])
    @IsOptional()
    @ValidateNested({ each: true })
    // genres: CreateGenreDto[];
    genres?: any;

    @Transform(({value}) => JSON.parse(value))
    @IsOptional()
    genreIds?: number[];

    @AutoMap()
    @IsNotEmpty()
    @Transform(({value}) => new Date(value))
    @IsDate()
    @MinDate(new Date(1900, 1, 1))
    @MaxDate(new Date())
    releaseDate: Date;

    @IsNotEmpty()
    @AutoMap()
    status: string;
}