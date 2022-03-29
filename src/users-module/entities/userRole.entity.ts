import { RouterModule } from "@nestjs/core";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./user.entity";

@Entity()
export class UserRole {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    label: string;

    @OneToMany(() => User, user => user.role)
    users: User[];
}