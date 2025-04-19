import {Post} from '../entities/Post';
import {
  findAllPosts,
  findUserById,
  savePost,
} from '../repositories/post.repository';

// 전체 게시글 조회
export const getAllPosts = async (): Promise<Post[]> => {
  return await findAllPosts();
};

// 게시글 작성
export const createNewPost = async (
    title: string,
    content: string,
    userId: number,
): Promise<Post | null> => {
  const author = await findUserById(userId);
  if (!author) return null;

  const newPost = new Post();
  newPost.title = title;
  newPost.content = content;
  newPost.author = author;

  return await savePost(newPost);
};