import { RouterModule } from "@nestjs/core";
import { Column, Entity, PrimaryGeneratedColumn, CreateDateColumn, JoinColumn } from "typeorm";

@Entity()
export class Song {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    description: string;

    @Column()
    file_path: string;

    @Column()
    lyrics: string;

    @Column()
    released_at: Date;
}