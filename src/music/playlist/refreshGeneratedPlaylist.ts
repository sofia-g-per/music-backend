import { Inject, Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { EntityManager } from 'typeorm';

@Injectable()
export class RefreshGeneratedPlaylist {
  constructor(
    @Inject(EntityManager) private entityManager: EntityManager,
) {}
 // время и частота обновления (каждый день в 00:00)
  @Cron('0 0 * * * *')
  async refreshPlaylist() {
    // обновление данных персонализированного плейлиста
    await this.entityManager.query(`REFRESH MATERIALIZED VIEW generated_playlist_by_user_song_listen_history`);
  }
}


