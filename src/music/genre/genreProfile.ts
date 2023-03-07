import { GenreDto } from './genreDto.dto';
import { CreateGenreDto } from './createGenre.dto';
import { createMap } from '@automapper/core';
import { AutomapperProfile, InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';
import { Mapper, MappingProfile } from '@automapper/core';

import { Genre } from './genre.entity';
@Injectable()
export class GenreProfile extends AutomapperProfile {
  constructor(@InjectMapper() mapper: Mapper) {
    super(mapper);
  }
  get profile(): MappingProfile {
    return (mapper) => {
      createMap(mapper, CreateGenreDto, Genre);

      // entity -> dto
      createMap(mapper, Genre, GenreDto)

    };
  }
}


