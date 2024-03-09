import {Request, Response} from 'express';
import {IUserComment} from '../types';
import UserComment from '../models/user-comment-model';
import mongoose from 'mongoose';
import UserCommentService from '../services/user-comment-service';

class UserCommentController {
  private userCommentService: UserCommentService;

  constructor() {
    this.userCommentService = new UserCommentService();
  }

  createComment = async (req: Request, res: Response) => {
    try {
      const {userId, destinationId, content}: IUserComment = req.body;

      await UserComment.create({
        userId,
        destinationId,
        content,
      });

      return res.send({
        message: 'Create comment successfully',
      });
    } catch (error) {
      console.log('Error in createComment:', error);
      return res.status(500).send({
        message: 'Error in createComment',
      });
    }
  };

  getCommentsByDestinationId = async (req: Request, res: Response) => {
    try {
      const destinationId = new mongoose.Types.ObjectId(
        req.params.destinationId,
      );
      const cmts = await UserComment.find({
        destinationId: destinationId,
        isDeleted: false,
      }).sort({updatedAt: -1});

      if (cmts && cmts.length > 0) {
        return res.send({
          message: 'Get all comments by destination successfully',
          data: cmts,
        });
      } else {
        return res.status(400).send({
          message: 'Do not have any comments by destination',
          data: [],
        });
      }
    } catch (error) {
      console.log('Error in getCommentsByDestinationId:', error);
      return res.status(500).send({
        message: 'Error in getCommentsByDestinationId',
      });
    }
  };

  deleteCommentById = async (req: Request, res: Response) => {
    try {
      const {id}: IUserComment = req.body;
      const cmtId = new mongoose.Types.ObjectId(id);
      const cmt = await UserComment.findById(cmtId);
      cmt.isDeleted = true;
      cmt.save();
    } catch (error) {
      console.log('Error in deleteCommentById:', error);
      return res.status(500).send({
        message: 'Error in getCommentsByDestinationId',
      });
    }
  };
}

export default UserCommentController;
