import { RouterModule } from "@nestjs/core";
import { Column, Entity, PrimaryGeneratedColumn, CreateDateColumn, JoinColumn } from "typeorm";

@Entity()
export class Genre {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    description: string;
}