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

@Module({
  imports: [
    TypeOrmModule.forRoot(), 
    MulterModule.register({
      dest: './uploaded'
    }),
    UsersModule, 
    MusicModule, 
    SharedModule],
  controllers: [
    UsersController,
    AppController, 
    SongController, 
    PlaylistController,
    PlaylistController,
    AlbumController
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
    SongsToAlbumsRepository
  ],
})

export class AppModule {
  
}
