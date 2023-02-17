import { UserRoleDto } from './../dtos/UserRoleDto.dto';
import { UserDto } from './../dtos/userDto.dto';
import { CreateUserDto } from './../dtos/createUser.dto';
import { createMap } from '@automapper/core';
import { AutomapperProfile, InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';
import { User } from '../entities/user.entity';
import { Mapper, MappingProfile } from '@automapper/core';
import { UserRole } from '../entities/userRole.entity';

@Injectable()
export class UserProfile extends AutomapperProfile {
  constructor(@InjectMapper() mapper: Mapper) {
    super(mapper);
  }
  get profile(): MappingProfile {
    return (mapper) => {
      // entity -> dto
      createMap(mapper, User, UserDto);
      // creating -> entity
      createMap(mapper, CreateUserDto, User);
      // entity -> dto
      createMap(mapper, UserRole, UserRoleDto);
    };
  }
}
