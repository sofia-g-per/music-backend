import { SongDto } from "../song/songDto.dto";
import { AlbumDto } from "../album/albumDto.dto";
import { Exclude, Expose } from "class-transformer";
import { GenreDto } from "../genre/genreDto.dto";
import { AutoMap } from "@automapper/classes";

@Exclude()
export class ArtistDto {

    @AutoMap()
    @Expose()
    id: number;

    @AutoMap()
    @Expose()
    stagename: string;

    @AutoMap()
    @Expose()
    description?: string;
    
    @AutoMap(() => [GenreDto])
    @Expose()
    genres?: GenreDto[];

    @Expose()
    songs?: SongDto[];

    @Expose()
    albums?: AlbumDto[];
}