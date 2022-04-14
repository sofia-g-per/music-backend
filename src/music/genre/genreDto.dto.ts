import { Exclude, Expose } from "class-transformer";

@Exclude()
export class GenreDto{

    @Expose()
    id: number;

    @Expose()
    name: string;

    @Expose()
    description: string;

}