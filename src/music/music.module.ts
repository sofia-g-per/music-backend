import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from 'src/users/users.module';
import { ArtistController } from './artist/artist.controller';
import { Artist } from './artist/artist.entity';
import { ArtistsRepository } from './artist/artist.repository';
import { ArtistService } from './artist/artist.service';
import { GenreController } from './genre/genre.controller';
import { Genre } from './genre/genre.entity';
import { GenresRepository } from './genre/Genre.repository';
import { GenreService } from './genre/genre.service';
import { MusicController } from './music.controller';
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
    Artist, 
    ArtistsRepository,
    Genre,
    GenresRepository,
    Song,
    SongsRepository
  ]),
  forwardRef(() => UsersModule),],
  exports: [TypeOrmModule, ArtistService]
})
export class MusicModule {}
