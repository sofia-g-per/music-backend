import {
    IsDate,
    IsOptional
  } from 'class-validator';

export class CreateSongDto {  
    name: string; 

    file_path: string;

    @IsDate()
    released_at: Date;

    @IsOptional()
    artists: Artist[];

    @IsOptional()
    description?: string;

    @IsOptional()
    lyrics?: string;

    @IsOptional()
    genres?: Genre[];
}