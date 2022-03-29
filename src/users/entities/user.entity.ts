import { RouterModule } from "@nestjs/core";
import { Column, Entity, PrimaryGeneratedColumn, CreateDateColumn, ManyToOne, OneToOne, OneToMany } from "typeorm";
import { UserRole } from "./userRole.entity";
import { Artist } from "./artist.entity";
import { Playlist } from "../../music/entities/playlist.entity";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    username: string;

    @Column()
    name: string;

    @Column()
    surname: string;

    @Column()
    avatar: string;

    @Column()
    email: string;

    @Column()
    password: string;

    @CreateDateColumn()
    created_at: Date;

    @ManyToOne(() => UserRole, userRole => userRole.users)
    role: UserRole;

    @OneToOne(() => Artist, artist => artist.user)
    artist: Artist;

    @OneToMany(() => Playlist, playlist=> playlist.creator)
    playlists: Playlist[];
}