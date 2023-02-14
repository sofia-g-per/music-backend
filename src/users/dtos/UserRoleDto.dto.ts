import { AutoMap } from "@automapper/classes";
import { AutomapperModule } from "@automapper/nestjs";
import { Exclude, Expose } from "class-transformer";

@Exclude()
export class UserRoleDto {

    @AutoMap()
    @Expose()
    id: number;

    @AutoMap()
    @Expose()
    label: string;

    @AutoMap()
    @Expose()
    name: string;
}