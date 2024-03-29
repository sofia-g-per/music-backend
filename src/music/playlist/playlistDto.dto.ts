import { IsNotEmpty, IsOptional, ValidateNested } from "class-validator";
import { Genre } from "../genre/genre.entity";
import { User } from "src/users/entities/user.entity";
import { SongDto } from "../song/songDto.dto";
import { AutoMap } from "@automapper/classes";

export class PlaylistDto{
    @AutoMap()
    id: number;
    
    @AutoMap()
    name: string;

    // @AutoMap()
    // isPublic: boolean;
    
    @AutoMap()
    description?: string;

    @AutoMap()
    coverImg?: string;

    // @AutoMap()
    // genres?: Genre[];

    //fix!!!
    @AutoMap()
    songs: any;

    @AutoMap()
    creator?: User;

    @AutoMap()
    creationDate?: Date;
}