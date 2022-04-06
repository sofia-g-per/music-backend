import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm/dist/typeorm.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { MusicModule } from './music/music.module';
import { SongService } from './music/song/song.service';
import { SharedModule } from './shared/shared.module';
import { PlaylistService } from './music/playlist/playlist.service';
import { SongController } from './music/song/song.controller';
import { PlaylistController } from './music/playlist/playlist.controller';
import { UserRolesService } from './users/userRoles.service';
import { UserRolesRepository } from './users/userRoles.repository';
import { UsersRepository } from './users/users.repository';
import { UsersService } from './users/users.service';

@Module({
  imports: [TypeOrmModule.forRoot(), UsersModule, MusicModule, SharedModule],
  controllers: [AppController, SongController, PlaylistController],
  providers: [
    AppService, 
    SongService, 
    PlaylistService, 
    UsersService,
    UserRolesService,
    UserRolesRepository,
    UsersRepository
  ],
})

export class AppModule {
  
}
