import { IsNotEmpty, IsOptional, ValidateNested } from "class-validator";
import { Song } from "../song/song.entity";
import { Genre } from "../genre/genre.entity";
import { User } from "src/users/entities/user.entity";
import { Artist } from "../artist/artist.entity";
import { SongDto } from "../song/songDto.dto";
import { ArtistDto } from "../artist/artistDto.dto";
export class AlbumDto{
    id: number;
    
    name: string;
    
    description?: string;

    coverImg?: string;

    genres?: Genre[];

    songs: SongDto[];

    artists: [
        {
            artist: ArtistDto,
            isFeatured: boolean,
        }
    ];

    released_at: Date;
}