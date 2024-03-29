import {Request, Response} from 'express';
import {IUserComment} from '../types';
import mongoose from 'mongoose';
import UserCommentService from '../services/user-comment-service';

class UserCommentController {
  private userCommentService: UserCommentService;

  constructor() {
    this.userCommentService = new UserCommentService();
  }

  createComment = async (req: Request, res: Response) => {
    try {
      const {userId, destinationId, content, star}: IUserComment = req.body;

      const result = await this.userCommentService.createComment(
        userId,
        destinationId,
        content,
        star,
      );

      return res.send({
        message: result.message,
        data: result.data,
      });
    } catch (error) {
      return res.status(500).send({
        message: 'Error in createComment',
        data: [],
      });
    }
  };

  updateComment = async (req: Request, res: Response) => {
    try {
      const id = new mongoose.Types.ObjectId(req.params.id);

      const {content, star}: IUserComment = req.body;

      const result = await this.userCommentService.updateComment(
        id,
        content,
        star,
      );

      return res.send({
        message: result.message,
        data: result.data,
      });
    } catch (error) {
      return res.status(500).send({
        message: 'Error in updateComment',
        data: [],
      });
    }
  };

  getCommentsByDestinationId = async (req: Request, res: Response) => {
    try {
      const destinationId = new mongoose.Types.ObjectId(
        req.params.destinationId,
      );

      const result = await this.userCommentService.getCommentsByDestinationId(
        destinationId,
      );
      return res.send({message: result.message, data: result.data});
    } catch (error) {
      return res.status(500).send({
        message: 'Error in getCommentsByDestinationId',
      });
    }
  };

  deleteCommentById = async (req: Request, res: Response) => {
    try {
      const id = req.params.commentId;
      const cmtId = new mongoose.Types.ObjectId(id);

      const result = await this.userCommentService.deleteCommentById(cmtId);
      return res.send({message: result.message});
    } catch (error) {
      return res.status(500).send({
        message: 'Error in getDeleteCommentById',
      });
    }
  };
}

export default UserCommentController;
