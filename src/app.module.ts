import { ListenedSongsRepository } from './music/favourites/listenedSongs.repository';
import { ListenedSong } from './music/favourites/listenedSong.entity';
import { FavoriteSongsRepository } from './music/favourites/favoriteSongs.repository';
import { FavoriteSong } from './music/favourites/favoriteSong.entity';
import { AlbumProfile } from './music/album/albumProfile';
import { PlaylistProfile } from './music/playlist/playlistProfile';
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
import { UserRolesService } from './users/services/userRoles.service';
import { UserRolesRepository } from './users/userRoles.repository';
import { UsersRepository } from './users/users.repository';
import { UsersService } from './users/services/users.service';
import { ArtistsRepository } from './music/artist/artist.repository';
import { ArtistService } from './music/artist/artist.service';
import { SongsRepository } from './music/song/song.repository';
import { GenreService } from './music/genre/genre.service';
import { GenresRepository } from './music/genre/genre.repository';
import { UsersController } from './users/users.controller';
import { MulterModule } from '@nestjs/platform-express';
import { ArtistsToSongs } from './music/artist/artistsToSongs.entity';
import { ArtistsToSongsRepository } from './music/artist/artistsToSongs.repository';
import { SongsToPlaylists } from './music/playlist/songsToPlaylists.entity';
import { SongsToPlaylistsRepository } from './music/playlist/songsToPlaylists.repository';
import { PlaylistsRepository } from './music/playlist/playlists.repository';
import { AlbumsRepository } from './music/album/albums.repository';
import { SongsToAlbums } from './music/album/songsToAlbums.entity';
import { SongsToAlbumsRepository } from './music/album/songsToAlbums.repository';
import { AlbumController } from './music/album/album.controller';
import { AlbumService } from './music/album/album.service';
import { AutomapperModule } from '@automapper/nestjs';
import { classes } from '@automapper/classes';
import { UserProfile } from './users/mappers/UserProfile';
import { SongProfile } from './music/song/songProfile';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import { ArtistProfile } from './music/artist/artistProfile';
import { GenreProfile } from './music/genre/genreProfile';
import { ScheduleModule } from '@nestjs/schedule';
import { SongCollabRequest } from './users/entities/songCollabRequest.entity';
import { RequestStatus } from './users/entities/requestStatus.entity';
import { CollabRequestsService } from './users/services/collabRequests.service';
import { CollabRequestProfile } from './users/mappers/CollabRequestsProfile';

@Module({
  imports: [
    // подключение базы данных
    TypeOrmModule.forRoot({
      // данные о базе данных
      "type" : "postgres",
      "host" : "localhost",
      "port" : 5433,
      "username" : "postgres",
      "password" : "123",
      "database" : "music",
      "namingStrategy": new SnakeNamingStrategy,
      // путь до сущностей 
      "entities": ["dist/**/*.entity.{js,ts}"],
      "migrations": ["src/migration/**/*.{ts, .js}"],
      "autoLoadEntities": true,
       // для разработки
        "synchronize": true,
      // уточнение путей папок создания файлов через командную строку
      "cli": {
        "entitiesDir": "src/entity",
        "migrationsDir": "src/migration",
        "subscribersDir": "src/subscriber"
     },
  }),
    AutomapperModule.forRoot({
      strategyInitializer: classes(),
    }),
    ScheduleModule.forRoot(),
    MulterModule.register({
      dest: './uploaded',
    }),
    UsersModule,
    MusicModule,
    SharedModule,
  ],
  controllers: [
    UsersController,
    AppController,
    SongController,
    PlaylistController,
    PlaylistController,
    AlbumController,
  ],
  providers: [
    AppService,
    ArtistsRepository,
    SongService,
    PlaylistService,
    UsersService,
    UserRolesService,
    ArtistService,
    GenreService,
    AlbumService,
    UserRolesRepository,
    UsersRepository,
    SongsRepository,
    GenresRepository,
    ArtistsToSongs,
    ArtistsToSongsRepository,
    SongsToPlaylists,
    SongsToPlaylistsRepository,
    PlaylistsRepository,
    AlbumsRepository,
    SongsToAlbums,
    SongsToAlbumsRepository,
    FavoriteSong,
    FavoriteSongsRepository,
    ListenedSong,
    ListenedSongsRepository,
    // new
    RequestStatus,
    SongCollabRequest,
    CollabRequestProfile,

    GenreProfile,
    UserProfile,
    ArtistProfile,
    SongProfile,
    PlaylistProfile, 
    AlbumProfile, 
    CollabRequestsService, 
  ],
})
export class AppModule {}
