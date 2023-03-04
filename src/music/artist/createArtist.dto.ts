import { CreateGenreDto } from './../genre/createGenre.dto';
import { IsNotEmpty, IsOptional, ValidateNested} from "class-validator";
import { Type } from "class-transformer";
import { AutoMap } from "@automapper/classes";
import { User } from "src/users/entities/user.entity";

export class CreateArtistDto {
    @AutoMap()
    @IsNotEmpty()
    stagename: string;

    @AutoMap()
    @IsOptional()
    description: string;

    @AutoMap()
    //существующие жанры
    @IsOptional()
    genreIds: [];

    @AutoMap(()=>CreateGenreDto)
    //новые жанры
    @IsOptional()
    @Type(() => CreateGenreDto)
    @ValidateNested()
    genres: CreateGenreDto[];

    // fix !! убрать добавить маппер
    @AutoMap(() => User)
    @IsOptional()
    @Type(() => User)
    @ValidateNested()
    user: User;

}
