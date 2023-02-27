import { SongDto } from "../song/songDto.dto";
import { Exclude, Expose } from "class-transformer";
import { GenreDto } from "../genre/genreDto.dto";
import { AutoMap } from "@automapper/classes";
import { ArtistAsAuthor } from "../artist/ArtistAsAuthor.dto";

@Exclude()
export class AlbumDto{
    @AutoMap()
    @Expose()
    id: number;
    
    @AutoMap()
    @Expose()
    name: string;

    @AutoMap()
    @Expose()
    description?: string;

    @AutoMap()
    @Expose()
    coverImg?: string;

    @AutoMap()
    @Expose()
    genres?: GenreDto[];

    @AutoMap()
    @Expose()
    songs: SongDto[];

    @AutoMap()
    @Expose()
    artists: [ArtistAsAuthor];

    @AutoMap()
    @Expose()
    released_at: Date;
}