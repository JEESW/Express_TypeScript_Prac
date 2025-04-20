import {IsNotEmpty} from 'class-validator';

export class CreateCommentDto {
  @IsNotEmpty()
  content!: string;

  @IsNotEmpty()
  userId!: number;

  @IsNotEmpty()
  postId!: number;
}