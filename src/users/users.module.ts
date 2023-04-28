import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LocalStrategy } from './local.startegy';
import { UsersController } from './users.controller';
import { UsersRepository } from './users.repository';
import { UserRolesRepository } from './userRoles.repository';
import { UsersService } from './services/users.service';
import { UserRolesService } from './services/userRoles.service';
import { SessionSerializer } from './session.serializer';
import { User } from './entities/user.entity';
import { UserRole } from './entities/userRole.entity';
import { UserRoleExists } from './validation/UserRoleExists.constraint';
import { IsUserEmailUnique } from './validation/IsUserEmailUnique.constraint';
import { MusicModule } from 'src/music/music.module';
import { PassportModule } from '@nestjs/passport';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { IsUsernameUnique } from './validation/IsUsernameUnique.constraint';
import { CollabRequestsService } from './services/collabRequests.service';

@Module({
  controllers: [UsersController],
  providers: [
    UsersService, 
    UserRolesService, 
    UserRoleExists, 
    IsUserEmailUnique,
    IsUsernameUnique,
    LocalStrategy, 
    SessionSerializer,
    LocalAuthGuard,
    CollabRequestsService
  ],
  imports: [
    PassportModule.register({session: true}),
    MusicModule,
    TypeOrmModule.forFeature([
    User, 
    UserRole, 
    UsersRepository, 
    UserRolesRepository
  ])],
  exports: [
    CollabRequestsService
  ]
  
})
export class UsersModule {
}
