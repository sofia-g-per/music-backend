import { IsNotEmpty } from "class-validator";
import { AutoMap } from "@automapper/classes";

export class CreateArtistToSongDto {
    @AutoMap()
    @IsNotEmpty()
    artistId: number;

    @AutoMap()
    @IsNotEmpty()
    isFeatured: boolean;

}
