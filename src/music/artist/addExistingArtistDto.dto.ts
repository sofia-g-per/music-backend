import { IsBoolean, IsNotEmpty} from "class-validator";

export class AddExistingArtistDto {

    @IsNotEmpty()
    artistId: number;

    @IsNotEmpty()
    @IsBoolean()
    isFeatured: boolean;

}