import { ListenedSong } from './favourites/listenedSong.entity';
import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from 'src/users/users.module';
import { AlbumController } from './album/album.controller';
import { Album } from './album/album.entity';
import { AlbumService } from './album/album.service';
import { AlbumsRepository } from './album/albums.repository';
import { SongsToAlbums } from './album/songsToAlbums.entity';
import { SongsToAlbumsRepository } from './album/songsToAlbums.repository';
import { ArtistController } from './artist/artist.controller';
import { Artist } from './artist/artist.entity';
import { ArtistsRepository } from './artist/artist.repository';
import { ArtistService } from './artist/artist.service';
import { ArtistsToSongs } from './artist/artistsToSongs.entity';
import { ArtistsToSongsRepository } from './artist/artistsToSongs.repository';
import { FavouritesController } from './favourites/favourites.controller';
import { FavouritesService } from './favourites/favourites.service';
import { GenreController } from './genre/genre.controller';
import { Genre } from './genre/genre.entity';
import { GenresRepository } from './genre/genre.repository';
import { GenreService } from './genre/genre.service';
import { MusicController } from './music.controller';
import { Playlist } from './playlist/playlist.entity';
import { PlaylistsRepository } from './playlist/playlists.repository';
import { SongsToPlaylists } from './playlist/songsToPlaylists.entity';
import { SongsToPlaylistsRepository } from './playlist/songsToPlaylists.repository';
import { SongController } from './song/song.controller';
import { Song } from './song/song.entity';
import { SongsRepository } from './song/song.repository';
import { SongService } from './song/song.service';
import { ArtistsToAlbums } from './album/artistsToAlbums.entity';
import { ArtistsToAlbumsRepository } from './album/artistsToAlbums.repository';
import { FavoriteSong } from './favourites/favoriteSong.entity';
import { ListenedSongsRepository } from './favourites/listenedSongs.repository';
import { generatedPlaylist } from './playlist/generatedPlaylist.entity';
import { AbstractSong } from './song/abstractSong.entity';

@Module({
  controllers: [
    MusicController,
    GenreController,
    ArtistController,
    SongController,
    AlbumController,
    FavouritesController
  ],
  providers: [
    GenreService,
    ArtistService,
    SongService,
    AlbumService,
    FavouritesService
  ],
  imports: [TypeOrmModule.forFeature([
    ArtistsRepository,
    Artist, 
    Genre,
    GenresRepository,
    Song,
    SongsRepository,
    ArtistsToSongs,
    ArtistsToSongsRepository,
    SongsToPlaylists,
    SongsToPlaylistsRepository,
    Playlist, 
    PlaylistsRepository,
    Album,
    AlbumsRepository,
    SongsToAlbums,
    SongsToAlbumsRepository,
    ArtistsToSongsRepository,
    FavoriteSong,
    ArtistsToAlbums,
    ArtistsToAlbumsRepository,
    ListenedSong,
    ListenedSongsRepository,
    generatedPlaylist,
    AbstractSong
  ]),
  forwardRef(() => UsersModule),],
  exports: [TypeOrmModule, ArtistService]
})
export class MusicModule {}
