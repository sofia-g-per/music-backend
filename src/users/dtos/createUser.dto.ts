import { IsEmail, IsOptional, ValidateNested, IsNotEmpty, Validate, IsEmpty } from "class-validator";
import { Type } from 'class-transformer';

import { UserRoleExists } from "../validation/UserRoleExists.constraint";
import { CreateArtistDto } from "src/music/artist/createArtist.dto";
import { IsUserEmailUnique } from "../validation/IsUserEmailUnique.constraint";
import { CreateGenreDto } from "src/music/genre/createGenre.dto";

export class CreateUserDto {

    @IsNotEmpty()
    username: string;

    @IsNotEmpty()
    name: string;
    
    @IsNotEmpty()
    surname: string;

    @IsOptional()
    avatar: string;

    @IsEmail()
    @Validate(IsUserEmailUnique)
    email: string;

    @IsNotEmpty()
    password: string;

    @IsNotEmpty()
    @Validate(UserRoleExists)
    roleId: number;

    @IsOptional()
    @Type(() => CreateArtistDto)
    @ValidateNested()
    artist: CreateArtistDto;

    @IsOptional()
    @Type(() => CreateGenreDto)
    @ValidateNested()
    genres: CreateArtistDto;

    @IsOptional()
    genreIds: number;

}