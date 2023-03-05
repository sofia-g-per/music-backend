import { IsBoolean, IsNotEmpty} from "class-validator";
import { AutoMap } from "@automapper/classes";

export class AddExistingArtistDto {
    @IsNotEmpty()
    @AutoMap()
    artistId: number;

    @IsNotEmpty()
    @IsBoolean()
    @AutoMap()
    isFeatured: boolean;

}