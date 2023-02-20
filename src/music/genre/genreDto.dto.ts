import { AutoMap } from "@automapper/classes";
import { Exclude, Expose } from "class-transformer";

@Exclude()
export class GenreDto{

    @AutoMap()
    @Expose()
    id: number;

    @AutoMap()
    @Expose()
    name: string;

    @AutoMap()
    @Expose()
    description: string;

}