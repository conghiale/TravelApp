import {Request, Response} from 'express';
import DestinationTypeService from '../services/destination-type-service';
import mongoose from 'mongoose';

class DestinationTypeController {
  private destinationTypeService: DestinationTypeService;

  constructor() {
    this.destinationTypeService = new DestinationTypeService();
  }

  getAllDestinationType = async (req: Request, res: Response) => {
    try {
      const result = await this.destinationTypeService.getAllDestinationType();
      return res.send({
        message: 'Get all destination type successfully',
        data: result,
      });
    } catch (error) {
      return res.status(500).send({message: 'Internal error in getAllDestinationType'});
    }
  };

  createDestinationType = async (req: Request, res: Response) => {
    try {
      const {labelVi, labelEn} = req.body;
      if(!labelVi || !labelEn) return res.status(400).send({message: 'Missing parameter(s)'})
      const result = await this.destinationTypeService.createDestinationType(labelVi, labelEn);
      return res.send({
        message: 'Create destination type successfully',
        data: result,
      });
    } catch (error) {
      return res.status(500).send({message: 'Internal error in createDestinationType'});
    }
  };

  updateDestinationTypeById = async (req: Request, res: Response) => {
    try {
      const {id} = req.params
      const {labelVi, labelEn} = req.body;

      if(!id || !labelVi || !labelEn) {
        return res.status(400).send({message: 'Missing parameter(s)'});
      }

      const idDestType = new mongoose.Types.ObjectId(id);
      const result = await this.destinationTypeService.updateDestinationTypeById(idDestType, labelVi, labelEn)
      if(result.success) {
        return res.send({message: result.message, data: result.data})
      }
      return res.status(400).send({message: result.message})
    } catch (error) {
      return res.status(500).send({message: 'Internal error in updateDestinationTypeById'});
    }
  };

  deleteDestinationTypeById = async (req: Request, res: Response) => {
    try {
      const {id} = req.params;
      const dTypeId = new mongoose.Types.ObjectId(id);
      await this.destinationTypeService.deleteDestinationTypeById(dTypeId);
      return res.send({message: 'Delete destination type by id successfully'});
    } catch (error) {
      return res.status(500).send({message: 'Internal error in deleteDestinationTypeById'})
    }
  };
}

export default DestinationTypeController;
