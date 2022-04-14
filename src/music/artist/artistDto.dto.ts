import { IsNotEmpty, IsOptional, ValidateNested} from "class-validator";
import { Genre } from "../genre/genre.entity";
import { SongDto } from "../song/songDto.dto";
import { AlbumDto } from "../album/albumDto.dto";
import { Exclude, Expose } from "class-transformer";
import { GenreDto } from "../genre/genreDto.dto";

@Exclude()
export class ArtistDto {

    @Expose()
    id: number;

    @Expose()
    stagename: string;

    @Expose()
    description?: string;
    
    @Expose()
    genres?: GenreDto[];

    @Expose()
    songs?: SongDto[];

    @Expose()
    albums?: AlbumDto[];

}