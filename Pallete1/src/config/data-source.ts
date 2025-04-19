import {DataSource} from 'typeorm';
import {Post} from '../entities/Post';
import {User} from '../entities/User';
import {Comment} from '../entities/Comment';

export const AppDataSource = new DataSource({
  type: 'mysql',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  synchronize: true,
  logging: true,
  entities: [Post, User, Comment],
});