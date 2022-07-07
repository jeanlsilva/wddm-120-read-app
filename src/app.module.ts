import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as dotenv from 'dotenv';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './domains/user/user.module';
import { NftModule } from './domains/nft/nft.module';
import { CommentModule } from './domains/comment/comment.module';
import { StarModule } from './domains/star/star.module';
import { User } from './domains/user/entities/user.entity';
import { Nft } from './domains/nft/entities/nft.entity';
import { Comment } from './domains/comment/entities/comment.entity';
import { Star } from './domains/star/entities/star.entity';

if (process.env.DB_HOST === null || process.env.DB_HOST === undefined) {
  dotenv.config({
    path: `./.env.${process.env.NODE_ENV}`,
  });
}

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.PG_HOST,
      port: Number(process.env.PG_PORT),
      username: process.env.PG_USERNAME,
      password: process.env.PG_PASSWORD,
      database: process.env.PG_DATABASE,
      entities: [User, Nft, Comment, Star],
      synchronize: true,
    }),
    UserModule,
    NftModule,
    CommentModule,
    StarModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
