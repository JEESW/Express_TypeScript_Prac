import {Request, Response} from 'express';
import {
  getAllPosts,
  createNewPost,
  getPostDetail,
  updatePost,
  removePost,
} from '../services/post.service';
import {CreatePostDto} from '../dtos/post/create-post.dto';
import {UpdatePostDto} from '../dtos/post/update-post.dto';
import {PostResponseDto} from '../dtos/post/post-response.dto';

// 전체 게시글 조회
export const getPosts = async (req: Request, res: Response): Promise<void> => {
  try {
    const posts = await getAllPosts();
    const response = posts.map((post) => new PostResponseDto(post));
    res.json(response);
  } catch (err) {
    res.status(500).json({message: '게시글 조회 실패'});
  }
};

// 게시글 작성
export const createPost = async (req: Request, res: Response): Promise<void> => {
  try {
    const {title, content, userId}: CreatePostDto = req.body;
    const newPost = await createNewPost(title, content, userId);

    if (!newPost) {
      res.status(404).json({message: '사용자를 찾을 수 없음'});
      return;
    }

    res.status(201).json(new PostResponseDto(newPost));
  } catch (err) {
    res.status(500).json({message: '게시글 작성 실패'});
  }
};

// 게시글 상세 조회
export const getPost = async (req: Request, res: Response): Promise<void> => {
  try {
    const postId = Number(req.params.id);
    const post = await getPostDetail(postId);

    if (!post) {
      res.status(404).json({message: '게시글을 찾을 수 없음'});
      return;
    }

    res.json(new PostResponseDto(post));
  } catch (err) {
    res.status(500).json({message: '게시글 조회 실패'});
  }
};

// 게시글 수정
export const editPost = async (req: Request, res: Response): Promise<void> => {
  try {
    const postId = Number(req.params.id);
    const {title, content}: UpdatePostDto = req.body;

    const updated = await updatePost(postId, title, content);
    if (!updated) {
      res.status(404).json({message: '게시글을 찾을 수 없음'});
      return;
    }

    res.json(new PostResponseDto(updated));
  } catch (err) {
    res.status(500).json({message: '게시글 수정 실패'});
  }
};

// 게시글 삭제
export const deletePost = async (req: Request, res: Response): Promise<void> => {
  try {
    const postId = Number(req.params.id);
    const success = await removePost(postId);

    if (!success) {
      res.status(404).json({message: '게시글을 찾을 수 없음'});
      return;
    }

    res.status(204).send();
  } catch (err) {
    res.status(500).json({message: '게시글 삭제 실패'});
  }
};