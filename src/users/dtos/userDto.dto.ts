import { ArtistDto } from "src/music/artist/artistDto.dto";
import { UserRole } from "../entities/userRole.entity";

export class CreateUserDto {

    id: number;

    username: string;

    name: string;
    
    surname: string;

    avatar?: string;

    email: string;

    role: UserRole;

    artist?: ArtistDto;
}