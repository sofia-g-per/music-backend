import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Artist } from './artist/artist.entity';
import { ArtistsRepository } from './artist/userRoles.repository';
import { MusicController } from './music.controller';

@Module({
  controllers: [MusicController],
  providers: [
  ],
  imports: [TypeOrmModule.forFeature([
    Artist, 
    ArtistsRepository
  ])],
  exports: [TypeOrmModule]
})
export class MusicModule {}
