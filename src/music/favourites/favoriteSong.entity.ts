import { Column, Entity, PrimaryGeneratedColumn, ManyToOne, CreateDateColumn, Check } from "typeorm";
import { User } from "../../users/entities/user.entity";
import { Song } from "../song/song.entity";

// наименование таблицы избранных песен
@Entity("favorite_songs")
// ограничения полей
@Check(`"id" > 0 AND "id" < 99999`)
@Check(`"add_date" = CURRENT_TIMESTAMP`)
// поля таблицы/свойства класса
export class FavoriteSong {
    @PrimaryGeneratedColumn()
    public id!: number;
    @Column()
    public userId!: number;
    @Column()
    public songId!: number;
    // дата добавления в избранное
    @CreateDateColumn({type: 'timestamp'})
    addDate!: Date;
    //------------------ 
    //      СВЯЗИ
    //------------------ 
    @ManyToOne(() => User, user => user.favoriteSongs, {onDelete: 'CASCADE'})
    public user!: User;

    @ManyToOne(() => Song, song => song.likedBy, {
        onDelete: 'CASCADE'
    })
    public song!: Song;
}

