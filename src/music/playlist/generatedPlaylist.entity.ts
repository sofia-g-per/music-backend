import { AutoMap } from '@automapper/classes';
import { ViewEntity, ViewColumn } from "typeorm"
import { AbstractSong } from '../song/abstractSong.entity';
import { Song } from "../song/song.entity"

@ViewEntity({
    name: "generated_playlist_by_user_song_listen_history",
    materialized: true,
    expression: `
    SELECT normalized_song_listen_history_popularity_by_user.user_id AS user_id,
    normalized_song_listen_history_popularity_by_user.song_id AS song_id,
    normalized_song_listen_history_popularity_by_user.normalized_song_popularity AS song_popularity
   FROM normalized_song_listen_history_popularity_by_user
     LEFT JOIN median_normalized_listened_song_popularity_by_user median_values ON median_values.user_id = normalized_song_listen_history_popularity_by_user.user_id
  WHERE normalized_song_listen_history_popularity_by_user.normalized_song_popularity >= median_values.median_popularity
  ORDER BY normalized_song_listen_history_popularity_by_user.user_id, normalized_song_listen_history_popularity_by_user.song_id;
    `,
})
export class generatedPlaylist {
    @ViewColumn()
    user_id: number;

    @ViewColumn()
    song_id: number;

    @ViewColumn()
    song_popularity: number;
}