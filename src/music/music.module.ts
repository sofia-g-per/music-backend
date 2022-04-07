import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ArtistController } from './artist/artist.controller';
import { Artist } from './artist/artist.entity';
import { ArtistsRepository } from './artist/artist.repository';
import { ArtistService } from './artist/artist.service';
import { GenreController } from './genre/genre.controller';
import { Genre } from './genre/genre.entity';
import { GenresRepository } from './genre/Genre.repository';
import { GenreService } from './genre/genre.service';
import { MusicController } from './music.controller';

@Module({
  controllers: [
    MusicController,
    GenreController,
    ArtistController
  ],
  providers: [
    GenreService,
    ArtistService
  ],
  imports: [TypeOrmModule.forFeature([
    Artist, 
    ArtistsRepository,
    Genre,
    GenresRepository
  ])],
  exports: [TypeOrmModule, ArtistService]
})
export class MusicModule {}
