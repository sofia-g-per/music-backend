import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LocalStrategy } from './local.startegy';
import { UsersController } from './users.controller';
import { UsersRepository } from './users.repository';
import { UserRolesRepository } from './userRoles.repository';
import { UsersService } from './users.service';
import { UserRolesService } from './userRoles.service';
import { SessionSerializer } from './session.serializer';

@Module({
  controllers: [UsersController],
  providers: [UsersService, UserRolesService,  LocalStrategy, SessionSerializer],
  imports: [TypeOrmModule.forFeature([UsersRepository, UserRolesRepository])],
  
})
export class UsersModule {
}
