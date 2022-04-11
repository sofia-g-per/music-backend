import { IsBoolean, IsNotEmpty} from "class-validator";

export class AddExistingArtistDto {

    @IsNotEmpty()
    //validates exists
    artistId: number;

    @IsNotEmpty()
    @IsBoolean()
    isFeatured: boolean;

}