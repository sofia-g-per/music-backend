import { IsBoolean, IsNotEmpty} from "class-validator";
import { AutoMap } from "@automapper/classes";

export class AddExistingArtistDto {
    @AutoMap()
    @IsNotEmpty()
    artistId: number;

    @AutoMap()
    @IsNotEmpty()
    @IsBoolean()
    isFeatured: boolean;

}