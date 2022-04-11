import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from 'src/users/users.module';
import { ArtistController } from './artist/artist.controller';
import { Artist } from './artist/artist.entity';
import { ArtistsRepository } from './artist/artist.repository';
import { ArtistService } from './artist/artist.service';
import { ArtistsToSongs } from './artist/artistsToSongs.entity';
import { ArtistsToSongsRepository } from './artist/artistsToSongs.repository';
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

@Module({
  controllers: [
    MusicController,
    GenreController,
    ArtistController,
    SongController
  ],
  providers: [
    GenreService,
    ArtistService,
    SongService
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
    PlaylistsRepository
  ]),
  forwardRef(() => UsersModule),],
  exports: [TypeOrmModule, ArtistService]
})
export class MusicModule {}
