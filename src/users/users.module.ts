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
import { Artist } from 'src/music/artist/artist.entity';
import { MusicModule } from 'src/music/music.module';
import { PassportModule } from '@nestjs/passport';

@Module({
  controllers: [UsersController],
  providers: [
    UsersService, 
    UserRolesService, 
    UserRoleExists, 
    IsUserEmailUnique,
    LocalStrategy, 
    SessionSerializer],
  imports: [
    PassportModule,
    MusicModule,
    TypeOrmModule.forFeature([
    User, 
    UserRole, 
    UsersRepository, 
    UserRolesRepository, 
    Artist
  ])],
  
})
export class UsersModule {
}
