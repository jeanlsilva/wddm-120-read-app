import { DataSource } from 'typeorm';
import * as dotenv from 'dotenv';
import { Comment } from './domains/comment/entities/comment.entity';
import { Nft } from './domains/nft/entities/nft.entity';
import { Star } from './domains/star/entities/star.entity';
import { User } from './domains/user/entities/user.entity';

if (process.env.DB_HOST === null || process.env.DB_HOST === undefined) {
  dotenv.config({
    path: `./.env.${process.env.NODE_ENV}`,
  });
}

console.log(process.env);

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: [User, Nft, Comment, Star],
  migrations: [process.env.MIGRATIONS_PATH],
});

AppDataSource.initialize()
  .then(() => {
    console.log('Data Source has been initialized!');
  })
  .catch((err) => {
    console.error('Error during Data Source initialization', err);
  });
