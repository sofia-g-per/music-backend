import { Exclude, Expose } from "class-transformer";

@Exclude()
export class UserRoleDto {

    @Expose()
    id: number;

    @Expose()
    label: string;

    @Expose()
    name: string;
}