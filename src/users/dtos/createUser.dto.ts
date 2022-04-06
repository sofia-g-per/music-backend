import { IsEmail, IsOptional, ValidateNested, IsNotEmpty, Validate } from "class-validator";
import { Type } from 'class-transformer';

import { UserRoleExists } from "../validation/UserRoleExists.constraint";
import { Artist } from "src/music/artist/artist.entity";
import { IsUserEmailUnique } from "../validation/IsUserEmailUnique.constraint";

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
    @Type(() => Artist)
    @ValidateNested()
    artist: Artist;
}