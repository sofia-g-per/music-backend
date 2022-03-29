import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm/dist/typeorm.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { MusicModule } from './music/musis.module';
import { FavouritesModule } from './favourites/favourites.module';

@Module({
  imports: [TypeOrmModule.forRoot(), UsersModule, MusicModule, FavouritesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
