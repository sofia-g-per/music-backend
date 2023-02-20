import { createMap } from '@automapper/core';
import { AutomapperProfile, InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';
import { Mapper, MappingProfile, forMember, mapFrom } from '@automapper/core';
import { Song } from './song.entity';
import { SongDto } from './songDto.dto';
import { CreateSongDto } from './createSong.dto';

@Injectable()
export class SongProfile extends AutomapperProfile {
  constructor(@InjectMapper() mapper: Mapper) {
    super(mapper);
  }
  get profile(): MappingProfile {
    return (mapper) => {
      // entity -> dto
      createMap(mapper, Song, SongDto)
      // creating -> entity
      createMap(mapper, CreateSongDto, Song);
    };
  }
}


