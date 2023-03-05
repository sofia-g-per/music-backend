import { IsNotEmpty, IsOptional, ValidateNested} from "class-validator";
import { AutoMap } from "@automapper/classes";

export class CreateArtistDto {
    @AutoMap()
    @IsNotEmpty()
    stagename: string;

    @AutoMap()
    @IsOptional()
    description: string;

    //существующие жанры
    // @AutoMap()
    // @IsOptional()
    // genreIds: [];

    // @AutoMap(()=>CreateGenreDto)
    // //новые жанры
    // @IsOptional()
    // @Type(() => CreateGenreDto)
    // @ValidateNested()
    // genres: CreateGenreDto[];

    // fix !! убрать добавить маппер
    // @AutoMap(() => User)
    // @IsOptional()
    // @Type(() => User)
    // @ValidateNested()
    // user: User;

}
