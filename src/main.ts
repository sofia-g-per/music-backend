import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { useContainer} from "class-validator";
import * as session from 'express-session';
import * as passport from 'passport';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express'
import { join } from 'path';
declare const module: any;

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(
    AppModule,
  );;
  app.enableCors({
    origin: 'http://localhost:8080',
    credentials: true
  });
  app.useStaticAssets(join(__dirname, '..', 'uploaded'));
  app.use(
    session({
      secret: 'secret',
      resave: false,
      saveUninitialized: false,
      cookie: { maxAge: 360000}
    }),
  );
  app.use(passport.initialize());
  app.use(passport.session());
  
  useContainer(app.select(AppModule), { fallbackOnErrors: true });
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(3000);


  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }
}
bootstrap();
