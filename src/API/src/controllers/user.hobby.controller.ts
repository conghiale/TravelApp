import {Request, Response} from 'express';
import UserHobbyService from '../services/user-hobby-service';

class UserHobbyController {
  private userHobbyService: UserHobbyService;

  constructor() {
    this.userHobbyService = new UserHobbyService();
  }

  createHobby = async (req: Request, res: Response) => {};

  updateHobby = async (req: Request, res: Response) => {};

  deleteHobbyById = async (req: Request, res: Response) => {};
}

export default UserHobbyController;
