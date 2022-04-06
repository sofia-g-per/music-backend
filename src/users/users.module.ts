import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LocalStrategy } from './local.startegy';
import { UsersController } from './users.controller';
import { UsersRepository } from './users.repository';
import { UserRolesRepository } from './userRoles.repository';
import { UsersService } from './users.service';
import { UserRolesService } from './userRoles.service';
import { SessionSerializer } from './session.serializer';
import { User } from './entities/user.entity';
import { UserRole } from './entities/userRole.entity';
import { UserRoleExists } from './validation/UserRoleExists.constraint';
import { IsUserEmailUnique } from './validation/IsUserEmailUnique.constraint';

@Module({
  controllers: [UsersController],
  providers: [
    UsersService, 
    UserRolesService, 
    UserRolesRepository, 
    UserRoleExists, 
    IsUserEmailUnique,
    LocalStrategy, 
    SessionSerializer],
  imports: [TypeOrmModule.forFeature([User, UserRole, UsersRepository, UserRolesRepository])],
  
})
export class UsersModule {
}
