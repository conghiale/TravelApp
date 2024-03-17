import {Request, Response} from 'express';
import {IUserComment} from '../types';
import mongoose from 'mongoose';
import UserCommentService from '../services/user-comment-service';
import {parseObjectId} from '../utils/password';
import DestinationService from '../services/destination-service';

class UserCommentController {
  private userCommentService: UserCommentService;
  private destinationService: DestinationService;

  constructor() {
    this.userCommentService = new UserCommentService();
    this.destinationService = new DestinationService();
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

      // update vote of destination
      const cmts = (
        await this.userCommentService.getCommentsByDestinationId(
          parseObjectId(destinationId),
        )
      ).data;

      const updateVote = this.userCommentService.calculateAverage(
        cmts.map(c => c.star),
      );

      await this.destinationService.updateDestinationById(
        parseObjectId(destinationId),
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        updateVote,
        null,
      );

      return res.send({
        message: result.message,
        data: result.data,
      });
    } catch (error) {
      console.log('Error in createComment:', error);
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
      console.log('user.comment.controller:: ERROR: ' + error);
      return res.status(500).send({
        message: 'Error in createComment',
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
      console.log('Error in getCommentsByDestinationId:', error);
      return res.status(500).send({
        message: 'Error in getCommentsByDestinationId',
      });
    }
  };

  deleteCommentById = async (req: Request, res: Response) => {
    try {
      // const { id }: IUserComment = req.body;
      // const cmtId = new mongoose.Types.ObjectId(id);
      // const cmt = await UserComment.findById(cmtId, { __v: 0 });
      // cmt.isDeleted = true;
      // cmt.save();

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
