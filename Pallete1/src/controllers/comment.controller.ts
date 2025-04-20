import {Request, Response} from 'express';
import {
  getComments,
  createComment,
  updateComment,
  removeComment,
} from '../services/comment.service';
import {CreateCommentDto} from '../dtos/comment/create-comment.dto';
import {UpdateCommentDto} from '../dtos/comment/update-comment.dto';
import {CommentResponseDto} from '../dtos/comment/comment-response.dto';

// 댓글 전체 조회
export const getCommentList = async (req: Request, res: Response) => {
  try {
    const postId = Number(req.params.postId);
    const comments = await getComments(postId);
    const response = comments.map((comment) => new CommentResponseDto(comment));
    res.json(response);
  } catch (err) {
    res.status(500).json({message: '댓글 조회 실패'});
  }
};

// 댓글 작성
export const createNewComment = async (req: Request, res: Response): Promise<void> => {
  try {
    const {content, userId, postId}: CreateCommentDto = req.body;
    const comment = await createComment(content, userId, postId);

    if (!comment) {
      res.status(404).json({message: '작성자 또는 게시글 없음'});
      return;
    }
    res.status(201).json(new CommentResponseDto(comment));
  } catch (err) {
    res.status(500).json({message: '댓글 작성 실패'});
  }
};

// 댓글 수정
export const editComment = async (req: Request, res: Response): Promise<void> => {
  try {
    const commentId = Number(req.params.id);
    const {content}: UpdateCommentDto = req.body;

    const updated = await updateComment(commentId, content);
    if (!updated) {
      res.status(404).json({message: '댓글 없음'});
      return;
    }

    res.json(new CommentResponseDto(updated));
  } catch (err) {
    res.status(500).json({message: '댓글 수정 실패'});
  }
};

// 댓글 삭제
export const deleteComment = async (req: Request, res: Response): Promise<void> => {
  try {
    const commentId = Number(req.params.id);
    const success = await removeComment(commentId);

    if (!success) {
      res.status(404).json({message: '댓글 없음'});
      return;
    }

    res.status(204).send();
  } catch (err) {
    res.status(500).json({message: '댓글 삭제 실패'});
  }
};