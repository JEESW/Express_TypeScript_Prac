import express from 'express';
import {
  getCommentList,
  createNewComment,
  editComment,
  deleteComment,
} from '../controllers/comment.controller';

const router = express.Router();

router.get('/:postId', getCommentList);
router.post('/', createNewComment);
router.put('/:id', editComment);
router.delete('/:id', deleteComment);

export default router;