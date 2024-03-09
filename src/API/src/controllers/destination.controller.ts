import {Request, Response} from 'express';
import DestinationService from '../services/destination-service';
import { IDestination } from '../types';
import mongoose from 'mongoose';
import { statusDestinationConstant } from '../utils/constant';

class DestinationController {
  private destService: DestinationService;

  constructor() {
    this.destService = new DestinationService();
  }

  createDestination = async (req: Request, res: Response) => {
    try {
      const {
        nameVi,
        nameEn,
        descriptionVi,
        descriptionEn,
        latitude,
        longitude,
        types,
        vote,
        createdBy,
        role,
      }: IDestination = req.body;

      if (
        !nameVi ||
        !nameEn ||
        !descriptionVi ||
        !descriptionEn ||
        !latitude ||
        !longitude ||
        !types ||
        !vote ||
        !createdBy ||
        !role
      ) {
        return res.status(400).send({
          message: 'Missing parameter(s)',
        });
      }

      const typesObject = types.map(id => new mongoose.Types.ObjectId(id));
      await this.destService.createDestination(
        req,
        res,
        nameVi,
        nameEn,
        descriptionVi,
        descriptionEn,
        latitude,
        longitude,
        typesObject,
        vote,
        new mongoose.Types.ObjectId(createdBy),
        role,
      );
    } catch (error) {
      return res.status(500).send({
        message: 'Internal error in createDestination',
      });
    }
  };

  updateDestination = async (req: Request, res: Response) => {
    const {
      id,
      nameVi,
      nameEn,
      descriptionVi,
      descriptionEn,
      latitude,
      longitude,
      types,
      vote,
      status,
    }: IDestination = req.body;

    const typesObject = types.map(id => new mongoose.Types.ObjectId(id));
    await this.destService.updateDestinationById(
      new mongoose.Types.ObjectId(id),
      nameVi,
      nameEn,
      descriptionVi,
      descriptionEn,
      latitude,
      longitude,
      typesObject,
      vote,
      status,
    );
  };

  deleteDestination = async (req: Request, res: Response) => {
    const {id}: IDestination = req.body;
    await this.destService.deleteDestinationById(
      new mongoose.Types.ObjectId(id),
    );
  };

  approveRejectDestination = async (req: Request, res: Response) => {
    try {
      const {id, accepted}: IDestination = req.body;
      if (typeof accepted === 'boolean') {
        await this.destService.updateDestinationById(
          new mongoose.Types.ObjectId(id),
          null,
          null,
          null,
          null,
          null,
          null,
          null,
          null,
          accepted
            ? statusDestinationConstant.ACCEPTED
            : statusDestinationConstant.REJECTED,
        );
        return res.send({
          message: accepted
            ? 'Accepted destination request'
            : 'Rejected destination request',
        });
      } else {
        return res.status(400).send({
          message: 'Invalid input parameter',
        });
      }
    } catch (error) {
      return res.status(500).send({
        message: 'Internal error in approveRejectDestination',
      });
    }
  };
}

export default DestinationController;
