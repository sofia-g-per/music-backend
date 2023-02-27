import { Album } from './album.entity';
import { CreateAlbumDto } from './createAlbum.dto';
import { createMap } from '@automapper/core';
import { AutomapperProfile, InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';
import { Mapper, MappingProfile } from '@automapper/core';
import { AlbumDto } from './albumDto.dto';

@Injectable()
export class AlbumProfile extends AutomapperProfile {
  constructor(@InjectMapper() mapper: Mapper) {
    super(mapper);
  }
  get profile(): MappingProfile {
    return (mapper) => {
      // entity -> dto
      createMap(mapper, Album, AlbumDto)
      // creating -> entity
      createMap(mapper, CreateAlbumDto, Album);
    };
  }
}


