import {AppDataSource} from '../config/data-source';
import {Comment} from '../entities/Comment';
import {Post} from '../entities/Post';
import {User} from '../entities/User';

const commentRepository = AppDataSource.getRepository(Comment);
const userRepository = AppDataSource.getRepository(User);
const postRepository = AppDataSource.getRepository(Post);

// 모든 댓글 조회
export const findCommentsByPostId = async (postId: number): Promise<Comment[]> => {
  return await commentRepository.find({
    where: {post: {id: postId}},
    relations: ['author'],
    order: {createdAt: 'ASC'},
  });
};

// 댓글 상세 조회
export const findCommentById = async (id: number): Promise<Comment | null> => {
  return await commentRepository.findOne({
    where: {id},
    relations: ['author', 'post'],
  });
};

// 댓글 저장
export const saveComment = async (comment: Comment): Promise<Comment> => {
  return await commentRepository.save(comment);
};

// 댓글 삭제
export const deleteCommentById = async (id: number): Promise<void> => {
  await commentRepository.delete(id);
};

// 유저 조회
export const findUserById = async (userId: number): Promise<User | null> => {
  return await userRepository.findOneBy({id: userId});
};

// 게시글 조회
export const findPostById = async (postId: number): Promise<Post | null> => {
  return await postRepository.findOneBy({id: postId});
};