import { IsNotEmpty, IsOptional, ValidateNested } from "class-validator";
import { CreateGenreDto } from "../genre/createGenre.dto";
import { Type } from 'class-transformer';

export class CreateAlbumDto{
    @IsNotEmpty()
    name: string;

    @IsNotEmpty()
    cover_img: string;

    //добавить информацию о порядке песен
    @IsNotEmpty()
    song_ids: number[];

    @IsNotEmpty()
    released_at: Date;
    
    @IsOptional()
    description: string;

    @IsOptional()
    artist_ids: number[];

    @IsOptional()
    @Type(() => CreateGenreDto)
    @ValidateNested()
    genres: CreateGenreDto[];

    @IsOptional()
    genre_ids: number[];
}