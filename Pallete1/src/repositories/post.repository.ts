import {AppDataSource} from '../config/data-source';
import {Post} from '../entities/Post';
import {User} from '../entities/User';

const postRepository = AppDataSource.getRepository(Post);
const userRepository = AppDataSource.getRepository(User);

// 모든 게시글 조회
export const findAllPosts = async (): Promise<Post[]> => {
  return await postRepository.find({
    relations: ['author', 'comments'],
    order: {createdAt: 'DESC'},
  });
};

// 유저 조회
export const findUserById = async (userId: number): Promise<User | null> => {
  return await userRepository.findOneBy({id: userId});
};

// 게시글 저장
export const savePost = async (post: Post): Promise<Post> => {
  return await postRepository.save(post);
};

// 게시글 상세 조회
export const findPostById = async (postId: number): Promise<Post | null> => {
  return await postRepository.findOne({
    where: {id: postId},
    relations: ['author', 'comments'],
  });
};

// 게시글 삭제
export const deletePostById = async (postId: number): Promise<void> => {
  await postRepository.delete(postId);
};