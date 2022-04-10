import { IsNotEmpty, IsOptional, ValidateNested } from "class-validator";
import { CreateGenreDto } from "../genre/createGenre.dto";
import { Type } from "class-transformer";

export class CreateAlbumDto{
    @IsNotEmpty()
    name: string;

    //добавить информацию о порядке песен
    @IsNotEmpty()
    song_ids: number[];
    
    @IsOptional()
    description: string;

    @IsOptional()
    cover_img: string;

    @IsOptional()
    @Type(() => CreateGenreDto)
    @ValidateNested()
    genres: CreateGenreDto[];

    @IsOptional()
    genre_ids: number[];
}