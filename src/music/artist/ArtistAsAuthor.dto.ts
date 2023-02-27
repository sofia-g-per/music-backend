import { ArtistDto } from 'src/music/artist/artistDto.dto';
import { AutoMap } from "@automapper/classes";
import { IsNotEmpty } from "class-validator";

export class ArtistAsAuthor extends ArtistDto{  
    @AutoMap()
    @IsNotEmpty()
    isFeatured: boolean;
}