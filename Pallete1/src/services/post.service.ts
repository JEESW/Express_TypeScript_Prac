import {Post} from '../entities/Post';
import {
  findAllPosts,
  findUserById,
  findPostById,
  savePost,
  deletePostById,
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

// 게시글 상세 조회
export const getPostDetail = async (postId: number): Promise<Post | null> => {
  return await findPostById(postId);
};

// 게시글 수정
export const updatePost = async (
    postId: number,
    title: string,
    content: string,
): Promise<Post | null> => {
  const post = await findPostById(postId);
  if (!post) return null;

  post.title = title;
  post.content = content;
  return await savePost(post);
};

// 게시글 삭제
export const removePost = async (postId: number): Promise<boolean> => {
  const post = await findPostById(postId);
  if (!post) return false;

  await deletePostById(postId);
  return true;
};