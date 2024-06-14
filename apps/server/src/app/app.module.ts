import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { AuthModule } from '../auth/auth.module';
import { MongooseModule } from '@nestjs/mongoose';
import { IsUnique } from './decorator/is-unique.decorator';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    AuthModule,
    ConfigModule.forRoot(),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '../../..', 'apps/client/dist'),
    }),
    MongooseModule.forRoot(process.env.MONGO_URI),
  ],
  providers: [IsUnique],
})
export class AppModule {}
