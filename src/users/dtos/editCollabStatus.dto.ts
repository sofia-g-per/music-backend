import { AutoMap } from "@automapper/classes";
import { IsNotEmpty } from "class-validator";

export class EditCollabStatusDto{
    @IsNotEmpty()
    @AutoMap()
    id: number;

    @IsNotEmpty()
    @AutoMap()
    status: string;
}