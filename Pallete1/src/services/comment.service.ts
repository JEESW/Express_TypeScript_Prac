import {Comment} from '../entities/Comment';
import {
  findCommentsByPostId,
  findCommentById,
  findUserById,
  findPostById,
  saveComment,
  deleteCommentById,
} from '../repositories/comment.repository';

// 댓글 전체 조회
export const getComments = async (postId: number): Promise<Comment[]> => {
  return await findCommentsByPostId(postId);
};

// 댓글 작성
export const createComment = async (
    content: string,
    userId: number,
    postId: number,
): Promise<Comment | null> => {
  const user = await findUserById(userId);
  const post = await findPostById(postId);
  if (!user || !post) return null;

  const comment = new Comment();
  comment.content = content;
  comment.author = user;
  comment.post = post;

  return await saveComment(comment);
};

// 댓글 수정
export const updateComment = async (
    commentId: number,
    content: string,
): Promise<Comment | null> => {
  const comment = await findCommentById(commentId);
  if (!comment) return null;

  comment.content = content;
  return await saveComment(comment);
};

// 댓글 삭제
export const removeComment = async (commentId: number): Promise<boolean> => {
  const comment = await findCommentById(commentId);
  if (!comment) return false;

  await deleteCommentById(commentId);
  return true;
};