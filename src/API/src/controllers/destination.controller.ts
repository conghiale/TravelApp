import {Request, Response} from 'express';
import DestinationService from '../services/destination-service';
import {IDestination} from '../types';
import mongoose from 'mongoose';
import {roleConstant, statusDestinationConstant} from '../utils/constant';
import {handleUpload, uploadFiles} from '../utils/upload';
import path from 'path';
import DestinationImage from '../models/destination-image-model';
import {parseObjectId} from '../utils/password';
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

  getDestinationById = async (req: Request, res: Response) => {
    const {id} = req.params;
    if (!id) {
      return res.status(400).send({
        message: 'Missing parameter(s)',
      });
    }

    const result = await this.destService.getDestinationById(id);
    if (result.success)
      return res.send({message: result.message, data: result.data});
    return res.status(400).send({message: result.message});
  };

  getAllPlacesOnMap = async (req: Request, res: Response) => {
    return res.send({data: await this.destService.getAllDestinationOnMap()});
  };

  getAllPlacesByRole = async (req: Request, res: Response) => {
    try {
      const {role, uid} = req.params;
      if (!role) {
        return res.status(400).send({message: 'Missing parameter(s)'});
      }

      if (role === roleConstant.ADMIN) {
        const data = await this.destService.getAllDestinationOnMap();
        return res.send({
          message: 'Get all destination successfully',
          data,
        });
      } else if (role === roleConstant.USER) {
        if (!uid) {
          return res.status(400).send({message: 'Missing parameter(s)'});
        }
        const userId = new mongoose.Types.ObjectId(uid);
        const data = await this.destService.getAllDestinationByCreatedUser(
          userId,
        );
        return res.send({
          message: 'Get all created destination successfully',
          data,
        });
      } else {
        return res.status(400).send({message: 'Invalid role of user'});
      }
    } catch (error) {
      return res.status(500).send({
        message: 'Internall error in getAllPlacesByRole',
      });
    }
  };

  getTopPlaces = async (req: Request, res: Response) => {
    try {
      const data = await Promise.all(
        (
          await this.destService.getTopPlaces()
        ).map(async d => ({
          ...d.toObject(),
          images: await this.destService.getImagesByDestinationId(d._id),
        })),
      );
      return res.send({
        message: 'Get top places successfully',
        data,
      });
    } catch (error) {
      return res.status(500).send({message: 'Internal error in getTopPlaces'});
    }
  };

  getNearestPlaces = async (req: Request, res: Response) => {
    const {latitude, longitude} = req.params;
    if (!latitude || !longitude)
      return res.status(400).send({message: 'Missing parameter(s)'});
    let userLatitude = 0,
      userLongitude = 0;
    try {
      userLatitude = parseFloat(latitude);
      userLongitude = parseFloat(longitude);
    } catch (error) {
      return res
        .status(400)
        .send({message: 'Invalid data type of parameter(s)'});
    }
    const data = await this.destService.getNearestPlaces(
      userLatitude,
      userLongitude,
    );
    return res.send({
      message: 'Get nearest places successfully',
      data,
    });
  };

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
          typesString,
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
          !typesString ||
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
        const typesArray = typesString.split(',');
        if (typesArray && typesArray.length > 0) {
          typesObject = typesArray.map(id => new mongoose.Types.ObjectId(id));
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
        );

        //add images
        const fileArray = req.files as Express.Multer.File[];
        for (let i = 0; i < fileArray.length; ++i) {
          DestinationImage.create({
            destinationId: newDest._id,
            path: `${newDest._id.toString()}/${fileArray[i].originalname}`,
          });
        }

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
      const {id} = req.params;
      const storedDir = `src/resources/destination/${id}`;
      uploadFiles(storedDir)(req, res, async (err: any) => {
        const {
          nameVi,
          nameEn,
          descriptionVi,
          descriptionEn,
          latitude,
          longitude,
          typesString,
          vote,
          status,
          role,
          createdBy,
        }: IDestination = req.body;

        const {data} = await this.destService.getDestinationById(id);
        if (!data) {
          return res.status(400).send({message: 'Destination does not exist'});
        }

        if (
          (role === roleConstant.ADMIN &&
            data.status !== statusDestinationConstant.ACCEPTED) ||
          (role === roleConstant.USER &&
            data.createdBy.toString() !== createdBy)
        ) {
          return res.status(400).send({message: 'Invalid action'});
        }
        if (err) {
          return res.status(400).json({message: err});
        }

        let typesObject: mongoose.Types.ObjectId[] = [];
        try {
          const typesArray = typesString.split(',');
          if (typesArray && typesArray.length > 0) {
            typesObject = typesArray.map(id => new mongoose.Types.ObjectId(id));
          }
        } catch (error) {
          return res
            .status(400)
            .send({message: 'Invalid types of destination'});
        }

        const result = await this.destService.updateDestinationById(
          parseObjectId(id),
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

        //add images
        const fileArray = req.files as Express.Multer.File[];
        if (fileArray && fileArray.length > 0) {
          const listFileName = fileArray.map(f => f.originalname);
          //db delete
          await DestinationImage.deleteMany({destinationId: id});
          //disk delete
          fs.readdir(storedDir, (err, files) => {
            if (err) {
              console.info('Error reading directory:', err);
              return;
            }

            files.forEach(file => {
              const filePath = path.join(storedDir, file);
              if (!listFileName.includes(file as string)) {
                fs.unlink(filePath, err => {
                  if (err) {
                    console.info('Error deleting file:', err);
                    return;
                  }
                  console.log(`Deleted file: ${filePath}`);
                });
              }
            });
          });
        }
        for (let i = 0; i < fileArray.length; ++i) {
          DestinationImage.create({
            destinationId: id,
            path: `${id}/${fileArray[i].originalname}`,
          });
        }

        const images = await this.destService.getImagesByDestinationId(id);
        return res.send({
          message: 'Update destination successfully',
          data: {
            ...result.data.toObject(),
            images,
          },
        });
      });
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
      return res.send({message: 'Delete destination successfully'});
    } catch (e) {
      return res
        .status(500)
        .send({message: 'Internal error in deleteDestination'});
    }
  };

  approvalDestination = async (req: Request, res: Response) => {
    try {
      const {id, accepted, reason}: IDestination = req.body;
      const idObject = new mongoose.Types.ObjectId(id);
      if (typeof accepted === 'boolean') {
        if (!accepted && !reason) {
          return res.status(400).send({message: 'Missing reason of rejection'});
        }
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
          accepted ? '' : reason,
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

  getWaitingDestination = async (req: Request, res: Response) => {
    try {
      const data = await this.destService.getWaitingDestination();
      return res.send({
        message: 'Get all waiting destination successfully',
        data,
      });
    } catch (error) {
      return res
        .status(500)
        .send({message: 'Internal error in getWaitingDestination'});
    }
  };

  getImagesByDestinationId = async (req: Request, res: Response) => {
    try {
      const data = await this.destService.getImagesByDestinationId(
        req.params.id,
      );
      return res.send({
        message: 'Get all images by destinationId successfully',
        data: data,
      });
    } catch (error) {
      return res
        .status(500)
        .send({message: 'Internal error in getImagesByDestinationId'});
    }
  };

  resubmitRequest = async (req: Request, res: Response) => {
    try {
      const {destinationId} = req.body;
      if (
        !destinationId ||
        !(await this.destService.checkDestinationById(destinationId))
      ) {
        return res.status(400).send({message: 'Missing parameter(s)'});
      }
      await this.destService.resubmitRequest(destinationId);
      return res.send({message: 'Resubmit request successfully'});
    } catch (error) {
      return res
        .status(500)
        .send({message: 'Internal error in resubmitRequest'});
    }
  };
}

export default DestinationController;
