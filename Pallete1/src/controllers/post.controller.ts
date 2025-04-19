import {Request, Response} from 'express';
import {getAllPosts, createNewPost} from '../services/post.service';

// 전체 게시글 조회
export const getPosts = async (req: Request, res: Response): Promise<void> => {
  try {
    const posts = await getAllPosts();
    res.json(posts);
  } catch (err) {
    console.error(err);
    res.status(500).json({message: '게시글 조회 실패'});
  }
};

// 게시글 작성
export const createPost = async (req: Request, res: Response): Promise<void> => {
  try {
    const {title, content, userId} = req.body;
    const newPost = await createNewPost(title, content, userId);

    if (!newPost) {
      res.status(404).json({message: '사용자를 찾을 수 없음'});
      return;
    }

    res.status(201).json(newPost);
  } catch (err) {
    console.error(err);
    res.status(500).json({message: '게시글 작성 실패'});
  }
};