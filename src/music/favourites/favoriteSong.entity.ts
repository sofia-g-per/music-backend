import { Column, Entity, PrimaryGeneratedColumn, ManyToOne, CreateDateColumn, Check } from "typeorm";
import { User } from "../../users/entities/user.entity";
import { Song } from "../song/song.entity";

@Entity("favorite_songs")
@Check(`"id" > 0 AND "id" < 99999`)
export class FavoriteSong {
    @PrimaryGeneratedColumn()
    public id!: number;

    @Column()
    public userId!: number;

    @Column()
    public songId!: number;

    @CreateDateColumn({type: 'timestamp'})
    addDate!: Date;

    @ManyToOne(() => User, user => user.favoriteSongs, {onDelete: 'CASCADE'})
    public user!: User;

    @ManyToOne(() => Song, song => song.likedBy, {
        onDelete: 'CASCADE'
    })
    public song!: Song;

}