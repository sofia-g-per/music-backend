import { Type } from "class-transformer";
import { IsNotEmpty, IsOptional } from "class-validator";
import { CreateSongDto } from "../song/createSong.dto";
import { Song } from "../song/song.entity";


export class AddExistingSongsToCollectionDto{
    @IsOptional()
    songId: number;
    
    @IsOptional()
    @Type(() =>CreateSongDto)
    song: CreateSongDto;

    @IsNotEmpty()
    songIndex: number;
}