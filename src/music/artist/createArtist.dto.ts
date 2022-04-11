import { IsNotEmpty, IsOptional, ValidateNested} from "class-validator";
import { Genre } from "../genre/genre.entity";
import { Type } from "class-transformer";
import { User } from "src/users/entities/user.entity";

export class CreateArtistDto {

    @IsNotEmpty()
    stagename: string;

    @IsOptional()
    description: string;

    //существующие жанры
    @IsOptional()
    genreIds: [];

    //новые жанры
    @IsOptional()
    @Type(() => Genre)
    @ValidateNested()
    genres: Genre[];

    @IsOptional()
    @Type(() => User)
    @ValidateNested()
    user: User;

}