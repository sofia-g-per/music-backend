import { IsNotEmpty } from "class-validator";

export class AddSongstoFavouritesDto{
    @IsNotEmpty()
    songId: number;
}