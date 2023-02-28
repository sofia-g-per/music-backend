import { AutoMap } from "@automapper/classes";
import { Exclude, Expose } from "class-transformer";

@Exclude()
export class UserRoleDto {

    @AutoMap()
    @Expose()
    id: number;

    @AutoMap()
    @Expose()
    label: string;
}