import { IsNotEmpty, IsOptional, ValidateNested } from "class-validator";
import { Song } from "../song/song.entity";
import { Genre } from "../genre/genre.entity";
import { User } from "src/users/entities/user.entity";
import { Artist } from "../artist/artist.entity";
import { SongDto } from "../song/songDto.dto";
import { ArtistDto } from "../artist/artistDto.dto";
import { Exclude, Expose } from "class-transformer";
import { GenreDto } from "../genre/genreDto.dto";

@Exclude()
export class AlbumDto{

    @Expose()
    id: number;
    
    @Expose()
    name: string;

    @Expose()
    description?: string;

    @Expose()
    coverImg?: string;

    @Expose()
    genres?: GenreDto[];

    @Expose()
    songs: SongDto[];

    @Expose()
    artists: [
        {
            artist: ArtistDto,
            isFeatured: boolean,
        }
    ];

    @Expose()
    released_at: Date;
}