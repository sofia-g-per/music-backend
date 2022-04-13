import { IsNotEmpty, IsOptional, ValidateNested} from "class-validator";
import { Genre } from "../genre/genre.entity";
import { SongDto } from "../song/song.dto";
import { AlbumDto } from "../album/albumDto.dto";

export class ArtistDto {

    id: number;

    stagename: string;

    description: string;
    
    genres: Genre[];

    songs: SongDto[];

    albums: AlbumDto[];

}