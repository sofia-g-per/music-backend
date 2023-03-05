import { AddExistingArtistDto } from './addExistingArtistDto.dto';
import { ArtistsToSongs } from './artistsToSongs.entity';
import { CreateArtistDto } from 'src/music/artist/createArtist.dto';
import { createMap } from '@automapper/core';
import { AutomapperProfile, InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';
import { Mapper, MappingProfile } from '@automapper/core';
import { ArtistDto } from './artistDto.dto';
import { Artist } from './artist.entity';
import { CreateArtistToSongDto } from './createArtistToSong.dto';

@Injectable()
export class ArtistProfile extends AutomapperProfile {
  constructor(@InjectMapper() mapper: Mapper) {
    super(mapper);
  }
  get profile(): MappingProfile {
    return (mapper) => {
      createMap(mapper, AddExistingArtistDto, ArtistsToSongs);

      // entity -> dto
      createMap(mapper, Artist, ArtistDto)
      // creating -> entity
      createMap(mapper, CreateArtistDto, Artist);
      createMap(mapper, CreateArtistToSongDto, ArtistsToSongs);
    };
  }
}


