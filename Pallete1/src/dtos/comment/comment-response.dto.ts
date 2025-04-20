import {Comment} from '../../entities/Comment';

export class CommentResponseDto {
  id: number;
  content: string;
  author: { id: number; username: string };
  createdAt: Date;

  constructor(comment: Comment) {
    this.id = comment.id;
    this.content = comment.content;
    this.author = {
      id: comment.author.id,
      username: comment.author.username,
    };
    this.createdAt = comment.createdAt;
  }
}