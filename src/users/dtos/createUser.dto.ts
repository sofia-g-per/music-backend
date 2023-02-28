import { IsEmail, IsOptional, ValidateNested, IsNotEmpty, Validate, IsEmpty } from "class-validator";
import { Type } from 'class-transformer';

import { UserRoleExists } from "../validation/UserRoleExists.constraint";
import { CreateArtistDto } from "src/music/artist/createArtist.dto";
import { IsUserEmailUnique } from "../validation/IsUserEmailUnique.constraint";
import { CreateGenreDto } from "src/music/genre/createGenre.dto";
import { AutoMap } from "@automapper/classes";

export class CreateUserDto {

    @AutoMap()
    @IsNotEmpty()
    username: string;

    @AutoMap()
    @IsNotEmpty()
    name: string;

    @AutoMap()
    @IsEmail()
    @Validate(IsUserEmailUnique)
    email: string;

    @IsNotEmpty()
    password: string;

    roleName: string;

    @AutoMap(()=>CreateArtistDto)
    @IsOptional()
    @Type(() => CreateArtistDto)
    @ValidateNested()
    artist: CreateArtistDto;

}