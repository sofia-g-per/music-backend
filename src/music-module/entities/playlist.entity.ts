import { RouterModule } from "@nestjs/core";
import { Column, Entity, PrimaryGeneratedColumn, CreateDateColumn, ManyToOne } from "typeorm";
import { User } from "../../users-module/entities/user.entity";

@Entity()
export class Playlist {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    description: string;

    @Column()
    is_public: boolean;

    @CreateDateColumn()
    created_at: Date;

    @ManyToOne(() => User, user=> user.playlists)
    creator: User;
}