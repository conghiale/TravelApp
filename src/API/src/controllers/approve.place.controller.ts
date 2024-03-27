import { Request, Response } from 'express';
import { IApprovePlace, IUserComment } from '../types';
import mongoose from 'mongoose';
import ApprovePlaceService from '../services/approve-place-service';

class ApprovePlaceController {
  private approvePlaceService: ApprovePlaceService;

  constructor() {
    this.approvePlaceService = new ApprovePlaceService();
  }

  createApprovePlace = async (req: Request, res: Response) => {
    try {
      const { userId, destinationId, status }: IApprovePlace = req.body;

      const result = await this.approvePlaceService.createApprovePlace(
        userId.map(c => new mongoose.Types.ObjectId(c)),
        new mongoose.Types.ObjectId(destinationId),
        status,
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

  updateApprovePlace = async (req: Request, res: Response) => {
    try {
      const id = new mongoose.Types.ObjectId(req.params.id);

      const { userId, status }: IApprovePlace = req.body;

      const result = await this.approvePlaceService.updateApprovePlace(
        id,
        userId.map(userId => new mongoose.Types.ObjectId(userId)),
        status
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

  updateUsersByDestinationId = async (req: Request, res: Response) => {
    try {
      const destId = new mongoose.Types.ObjectId(req.params.destinationId);

      const userId: string = req.body.userId;

      const result = await this.approvePlaceService.updateUsersByDestinationId(
        destId,
        new mongoose.Types.ObjectId(userId),
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

  updateStatusByDestinationId = async (req: Request, res: Response) => {
    try {
      const destId = new mongoose.Types.ObjectId(req.params.destinationId);

      const status: number = req.body.status;

      const result = await this.approvePlaceService.updateStatusByDestinationId(
        destId,
        status,
      );

      return res.send({
        message: result.message,
        data: result.data,
      });
    } catch (error) {
      return res.status(500).send({
        message: 'Error in updateApproveStatus',
        data: [],
      });
    }
  };


  getApprovePlaceByDestinationId = async (req: Request, res: Response) => {
    try {
      const destinationId = new mongoose.Types.ObjectId(
        req.params.destinationId,
      );

      const result = await this.approvePlaceService.getApprovePlaceByDestinationId(
        destinationId,
      );
      return res.send({ message: result.message, data: result.data });
    } catch (error) {
      return res.status(500).send({
        message: 'Error in getCommentsByDestinationId',
      });
    }
  };

  getAllApprovePlace = async (req: Request, res: Response) => {
    try {
      const result = await this.approvePlaceService.getAllApprovePlace();
      return res.send({ message: result.message, data: result.data });
    } catch (error) {
      return res.status(500).send({
        message: 'Error in getCommentsByDestinationId',
      });
    }
  };

  deleteApprovePlaceById = async (req: Request, res: Response) => {
    try {
      const id = req.params.approveId;
      const cmtId = new mongoose.Types.ObjectId(id);

      const result = await this.approvePlaceService.deleteApprovedPlaceById(cmtId);
      return res.send({ message: result.message });
    } catch (error) {
      return res.status(500).send({
        message: 'Error in getDeleteCommentById',
      });
    }
  };

  deleteApprovedPlaceByDestinationId = async (req: Request, res: Response) => {
    try {
      const id = req.params.destinationId;
      const cmtId = new mongoose.Types.ObjectId(id);

      const result = await this.approvePlaceService.deleteApprovedPlaceByDestinationId(cmtId);
      return res.send({ message: result.message });
    } catch (error) {
      return res.status(500).send({
        message: 'Error in getDeleteCommentById',
      });
    }
  };
}

export default ApprovePlaceController;
