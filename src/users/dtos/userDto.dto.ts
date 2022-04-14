import { Exclude, Expose } from "class-transformer";
import { ArtistDto } from "src/music/artist/artistDto.dto";
import { UserRole } from "../entities/userRole.entity";
import { UserRoleDto } from "./UserRoleDto.dto";

@Exclude()
export class CreateUserDto {

    @Expose()
    id: number;

    @Expose()
    username: string;

    @Expose()
    name: string;
    
    @Expose()
    surname: string;

    @Expose()
    avatar?: string;

    @Expose()
    email: string;

    @Expose()
    role: UserRoleDto;

    @Expose()
    artist?: ArtistDto;
}