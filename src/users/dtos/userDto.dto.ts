import { IsEmail, IsOptional, ValidateNested, IsNotEmpty, Validate, IsEmpty } from "class-validator";
import { Type } from 'class-transformer';

import { UserRoleExists } from "../validation/UserRoleExists.constraint";
import { CreateArtistDto } from "src/music/artist/createArtist.dto";
import { IsUserEmailUnique } from "../validation/IsUserEmailUnique.constraint";
import { CreateGenreDto } from "src/music/genre/createGenre.dto";
import { ArtistDto } from "src/music/artist/artistDto.dto";
import { UserRole } from "../entities/userRole.entity";

export class CreateUserDto {

    id: number;
    
    username: string;

    name: string;
    
    surname: string;

    avatar: string;

    email: string;

    role: UserRole;

    artist: ArtistDto;
}