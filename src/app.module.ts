import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm/dist/typeorm.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModuleModule } from './users-module/users-module.module';
import { MusicModuleModule } from './music-module/music-module.module';
import { FavouritesModuleModule } from './favourites-module/favourites-module.module';

@Module({
  imports: [TypeOrmModule.forRoot(), UsersModuleModule, MusicModuleModule, FavouritesModuleModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
