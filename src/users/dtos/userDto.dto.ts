import { AutoMap } from "@automapper/classes";
import { Exclude, Expose } from "class-transformer";
import { ArtistDto } from "src/music/artist/artistDto.dto";
import { UserRole } from "../entities/userRole.entity";
import { UserRoleDto } from "./UserRoleDto.dto";

@Exclude()
export class UserDto {

    @AutoMap()
    @Expose()
    id: number;

    @AutoMap()
    @Expose()
    username: string;

    @AutoMap()
    @Expose()
    name: string;

    @AutoMap()
    @Expose()
    avatar?: string;

    @AutoMap()
    @Expose()
    email: string;

    @AutoMap(()=>UserRoleDto)
    @Expose()
    role: UserRoleDto;

    @AutoMap(()=>ArtistDto)
    @Expose()
    artist?: ArtistDto;
}