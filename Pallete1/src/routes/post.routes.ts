import express from 'express';
import {
  getPosts,
  getPost,
  createPost,
  editPost,
  deletePost,
} from '../controllers/post.controller';

const router = express.Router();

router.get('/', getPosts);
router.get('/:id', getPost);
router.post('/', createPost);
router.put('/:id', editPost);
router.delete('/:id', deletePost);

export default router;