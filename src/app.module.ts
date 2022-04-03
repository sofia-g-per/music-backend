import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm/dist/typeorm.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { MusicModule } from './music/music.module';
import { SongService } from './music/song/song.service';
import { SharedModule } from './shared/shared.module';
import { PlaylistService } from './playlist/playlist.service';
import { SongController } from './song/song.controller';
import { PlaylistController } from './playlist/playlist.controller';

@Module({
  imports: [TypeOrmModule.forRoot(), UsersModule, MusicModule, SharedModule],
  controllers: [AppController, SongController, PlaylistController],
  providers: [AppService, SongService, PlaylistService],
})
export class AppModule {}
