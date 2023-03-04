import { CreateArtistDto } from 'src/music/artist/createArtist.dto';
import { createMap } from '@automapper/core';
import { AutomapperProfile, InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';
import { Mapper, MappingProfile } from '@automapper/core';
import { ArtistDto } from './artistDto.dto';
import { Artist } from './artist.entity';

@Injectable()
export class ArtistProfile extends AutomapperProfile {
  constructor(@InjectMapper() mapper: Mapper) {
    super(mapper);
  }
  get profile(): MappingProfile {
    return (mapper) => {
      // entity -> dto
      createMap(mapper, Artist, ArtistDto)
      // creating -> entity
      createMap(mapper, CreateArtistDto, Artist);
    };
  }
}


