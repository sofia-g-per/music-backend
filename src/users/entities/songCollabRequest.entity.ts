import { Entity, ManyToOne } from "typeorm";
import { Song } from "src/music/song/song.entity";
import { CollabRequest } from "./collabRequest.entity";

@Entity("song_collab_requests")
export class SongCollabRequest extends CollabRequest{
    
    @ManyToOne(() => Song, song => song.id, {eager: true, onDelete: 'CASCADE'})
    content: Song;
}