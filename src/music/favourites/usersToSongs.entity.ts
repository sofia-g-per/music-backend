import { RouterModule } from "@nestjs/core";
import { Column, Entity, PrimaryGeneratedColumn, ManyToOne, CreateDateColumn } from "typeorm";
import { User } from "../../users/entities/user.entity";
import { Song } from "../song/song.entity";

@Entity()
export class UsersToSongs {
    @PrimaryGeneratedColumn()
    public id!: number;

    @Column()
    public userId!: number;

    @Column()
    public songId!: number;

    @CreateDateColumn()
    added_at!: Date;

    @ManyToOne(() => User, user => user.favoriteSongs, {onDelete: 'CASCADE'})
    public user!: User;

    @ManyToOne(() => Song, song => song.listeners, {
        eager: true,
        onDelete: 'CASCADE'
    })
    public song!: Song;

}