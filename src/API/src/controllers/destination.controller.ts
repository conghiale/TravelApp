import {Request, Response} from 'express';
import DestinationService from '../services/destination-service';

class DestinationController {
  private destService: DestinationService;

  constructor() {
    this.destService = new DestinationService();
  }

  createDestination = async (req: Request, res: Response) => {};

  updateDestination = async (req: Request, res: Response) => {};

  deleteDestination = async (req: Request, res: Response) => {};

  approveRejectDestination = async (req: Request, res: Response) => {};
}

export default DestinationController;
