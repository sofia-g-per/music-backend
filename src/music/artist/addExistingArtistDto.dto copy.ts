import { IsBoolean, IsEmpty, IsNotEmpty, IsOptional, ValidateNested} from "class-validator";
import { Type } from "class-transformer";
import { Artist } from "./artist.entity";

export class AddExistingArtistDto {

    @IsNotEmpty()
    //validates exists
    artistId: number;

    @IsNotEmpty()
    @IsBoolean()
    isFeatured: boolean;

}