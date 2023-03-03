import { Column, Entity, PrimaryGeneratedColumn, ManyToOne, CreateDateColumn } from "typeorm";
import { User } from "../../users/entities/user.entity";
import { Song } from "../song/song.entity";

@Entity("song_listen_history")
export class ListenedSong {
    @PrimaryGeneratedColumn()
    public id!: number;

    @Column()
    public userId!: number;

    @Column()
    public songId!: number;

    @CreateDateColumn({type: 'timestamp'})
    listenDate!: Date;

    @ManyToOne(() => User, user => user.listenedSongs, {onDelete: 'CASCADE'})
    public user!: User;

    @ManyToOne(() => Song, song => song.listeners, {
        onDelete: 'CASCADE'
    })
    public song!: Song;

}