import {Request, Response} from 'express';
import {IUserComment} from '../types';
import UserComment from '../models/user-comment-model';
import mongoose from 'mongoose';

class UserCommentController {
  createComment = async (req: Request, res: Response) => {
    try {
      const {userId, destinationId, content}: IUserComment = req.body;

      await UserComment.create({
        userId,
        destinationId,
        content,
      });

      return res.send({
        isSuccess: true,
        message: `Create comment successfully`,
      });
    } catch (error) {
      console.log('Error in createComment:', error);
      return res.status(500).send({
        isSuccess: false,
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
          isSuccess: true,
          message: 'Get all comments by destination successfully',
          data: cmts,
        });
      } else {
        return res.send({
          isSuccess: true,
          message: 'Do not have any comments by destination',
          data: [],
        });
      }
    } catch (error) {
      console.log('Error in getCommentsByDestinationId:', error);
      return res.status(500).send({
        isSuccess: false,
        message: `Error in getCommentsByDestinationId`,
      });
    }
  };

  deleteCommentById = async (req: Request, res: Response) => {
    try {
      const id = new mongoose.Types.ObjectId(req.body.id);
    } catch (error) {}
  };
}

export default UserCommentController;
