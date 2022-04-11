import { IsNotEmpty } from "class-validator";


export class AddExistingSongsToCollectionDto{
    @IsNotEmpty()
    songId: number;

    @IsNotEmpty()
    //проверить что элементы не совпадают
    songIndex: number;
}