import { Type } from "class-transformer";
import { IsNotEmpty, IsOptional } from "class-validator";
import { CreateSongDto } from "../song/createSong.dto";
import { Song } from "../song/song.entity";


export class AddExistingSongsToCollectionDto{
    @IsOptional()
    songId: number;
    //должны быть хотя бы одно из этих полей
    @IsOptional()
    @Type(() =>CreateSongDto)
    song: CreateSongDto;

    @IsNotEmpty()
    //проверить что элементы не совпадают
    songIndex: number;
}