import { IsNotEmpty, IsOptional, ValidateNested } from "class-validator";
import { Genre } from "../genre/genre.entity";
import { User } from "src/users/entities/user.entity";
import { SongDto } from "../song/song.dto";
export class PlaylistDto{
    id: number;
    
    name: string;

    isPublic: boolean;
    
    description: string;

    coverImg: string;

    genres: Genre[];

    songs: SongDto[];

    creator: User;

    created_at: Date;
}