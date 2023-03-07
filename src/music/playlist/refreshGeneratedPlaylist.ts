import { Inject, Injectable, Logger } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { QueryBuilder, EntityManager } from 'typeorm';

@Injectable()
export class RefreshGeneratedPlaylist {
  constructor(
    @Inject(EntityManager) private entityManager: EntityManager,
) {}
  @Cron('0 0 * * * *')
  async handleCron() {
    await this.entityManager.query(`REFRESH MATERIALIZED VIEW generated_playlist_by_user_song_listen_history`);
  }
}