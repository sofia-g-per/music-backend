import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Artist } from './artist/artist.entity';
import { ArtistsRepository } from './artist/artist.repository';
import { GenreController } from './genre/genre.controller';
import { Genre } from './genre/genre.entity';
import { GenresRepository } from './genre/Genre.repository';
import { GenreService } from './genre/genre.service';
import { MusicController } from './music.controller';

@Module({
  controllers: [
    MusicController,
    GenreController
  ],
  providers: [
    GenreService
  ],
  imports: [TypeOrmModule.forFeature([
    Artist, 
    ArtistsRepository,
    Genre,
    GenresRepository
  ])],
  exports: [TypeOrmModule]
})
export class MusicModule {}
