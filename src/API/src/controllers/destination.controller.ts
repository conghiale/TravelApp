import {Request, Response} from 'express';
import DestinationService from '../services/destination-service';
import {IDestination} from '../types';
import mongoose from 'mongoose';
import {roleConstant, statusDestinationConstant} from '../utils/constant';
import {handleUpload, uploadFiles} from '../utils/upload';
import path from 'path';
const fs = require('fs');

class DestinationController {
  private destService: DestinationService;

  constructor() {
    this.destService = new DestinationService();
  }

  uploadMulti = async (req: Request, res: Response) => {
    const storePath = 'src/resources/destination';
    uploadFiles(storePath)(req, res, (err: any) => {
      if (err) {
        return res.status(400).json({message: err});
      }
      handleUpload(req, res);
    });
  };

  getTopPlaces = async (req: Request, res: Response) => {
    try {
      
    } catch (error) {
      return res.status(500).send({message: 'Internal error in getTopPlaces'})
    }
  }

  getNearestPlaces = async (req: Request, res: Response) => {
    
  }

  createDestination = async (req: Request, res: Response) => {
    try {
      const destId = new mongoose.Types.ObjectId();
      const storedDir = `src/resources/destination/${destId}`;
      if (!fs.existsSync(storedDir)) {
        fs.mkdirSync(storedDir, {recursive: true});
      }

      uploadFiles(storedDir)(req, res, async (err: any) => {
        if (err) {
          return res.status(400).json({message: err});
        }

        const {
          nameVi,
          nameEn,
          descriptionVi,
          descriptionEn,
          latitude,
          longitude,
          types,
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
          !createdBy ||
          !role
        ) {
          return res.status(400).send({
            message: 'Missing parameter(s)',
          });
        }

        let status;
        if (role === roleConstant.ADMIN) {
          status = statusDestinationConstant.ACCEPTED;
        } else if (role === roleConstant.USER) {
          status = statusDestinationConstant.WAITING;
        } else {
          return res.status(400).send({message: 'Invalid role of user'});
        }

        let typesObject: mongoose.Types.ObjectId[] = [];
        const typesArray = types.split(',')
        if(typesArray && typesArray.length > 0) {
          typesObject =typesArray.map(id => new mongoose.Types.ObjectId(id));
        }

        const createdByOI = new mongoose.Types.ObjectId(createdBy);
        const newDest = await this.destService.createDestination(
          nameVi,
          nameEn,
          descriptionVi,
          descriptionEn,
          latitude,
          longitude,
          typesObject,
          status,
          createdByOI,
          role,
        );

        const oldPath = path.join(
          __dirname,
          '..',
          `resources/destination/${destId.toString()}`,
        );
        const newPath = path.join(
          __dirname,
          '..',
          `resources/destination/${newDest._id.toString()}`,
        );
        if (fs.existsSync(oldPath)) {
          fs.rename(oldPath, newPath, err => {
            if (err) {
              return res.send({message: 'Error rename file'});
            }
          });
        } else {
          return res.send({message: 'Saving file(s) failed'});
        }

        return res.send({
          message: 'Create destination successfully',
          data: newDest,
        });
      });
    } catch (error) {
      return res.status(500).send({
        message: 'Internal error in createDestination',
      });
    }
  };

  updateDestination = async (req: Request, res: Response) => {
    try {
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

      // const typesObject = types.map(id => new mongoose.Types.ObjectId(id));
      let typesObject: mongoose.Types.ObjectId[] = [];
      const typesArray = types.split(',');
      if (typesArray && typesArray.length > 0) {
        typesObject = typesArray.map(id => new mongoose.Types.ObjectId(id));
      }

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

      return res.send({message: 'Update destination successfully'})
    } catch (e) {
      return res
        .status(500)
        .send({message: 'Internal error in updateDestination'});
    }
  };

  deleteDestination = async (req: Request, res: Response) => {
    try {
      const {id}: IDestination = req.body;
      await this.destService.deleteDestinationById(
        new mongoose.Types.ObjectId(id),
      );
      return res.send({message: 'Delete destination successfully'})
    } catch (e) {
      return res
        .status(500)
        .send({message: 'Internal error in deleteDestination'});
    }
  };

  approveRejectDestination = async (req: Request, res: Response) => {
    try {
      const {id, accepted}: IDestination = req.body;
      const idObject = new mongoose.Types.ObjectId(id);
      if (typeof accepted === 'boolean') {
        await this.destService.updateDestinationById(
          idObject,
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
