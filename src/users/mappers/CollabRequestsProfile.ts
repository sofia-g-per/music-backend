import { createMap } from '@automapper/core';
import { AutomapperProfile, InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';
import { SongCollabRequest } from '../entities/songCollabRequest.entity';
import { Mapper, MappingProfile, forMember, mapFrom } from '@automapper/core';
import { EditCollabStatusDto } from '../dtos/editCollabStatus.dto';
import { RequestStatus } from '../entities/requestStatus.entity';

@Injectable()
export class CollabRequestProfile extends AutomapperProfile {
  constructor(@InjectMapper() mapper: Mapper) {
    super(mapper);
  }
  get profile(): MappingProfile {
    return (mapper) => {
      // creating -> entity
      createMap(mapper, EditCollabStatusDto, SongCollabRequest, forMember(entity => entity.status,
          mapFrom(dto => {
            return {name: dto.status};
          })
        ));
    };
  }
}


