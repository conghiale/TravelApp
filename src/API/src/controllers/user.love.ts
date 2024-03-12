import {Request, Response} from 'express';
import UserLoveService from '../services/user-love-service';

class UserLoveController {
  private userLoveService: UserLoveService;

  constructor() {
    this.userLoveService = new UserLoveService();
  }

  createHobby = async (req: Request, res: Response) => {
    
  };

  updateHobby = async (req: Request, res: Response) => {};

  deleteHobbyById = async (req: Request, res: Response) => {};
}

export default UserLoveController;
