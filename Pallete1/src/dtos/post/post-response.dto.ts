import {Post} from '../../entities/Post';

export class PostResponseDto {
  id: number;
  title: string;
  content: string;
  author: { id: number; username: string };
  createdAt: Date;
  updatedAt: Date;

  constructor(post: Post) {
    this.id = post.id;
    this.title = post.title;
    this.content = post.content;
    this.author = {
      id: post.author.id,
      username: post.author.username,
    };
    this.createdAt = post.createdAt;
    this.updatedAt = post.updatedAt;
  }
}