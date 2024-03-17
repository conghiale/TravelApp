import {Request, Response} from 'express';
import UserLoveService from '../services/user-love-service';
import {orderConstant} from '../utils/constant';
import {parseObjectId} from '../utils/password';
import UserLove from '../models/user-love-model';

class UserLoveController {
  private userLoveService: UserLoveService;

  constructor() {
    this.userLoveService = new UserLoveService();
  }

  getLoveListByUserId = async (req: Request, res: Response) => {
    try {
      const {id, order} = req.params;
      if (!id || !order) {
        return res.status(400).send({message: 'Missing parameter(s)'});
      }
      const result = await this.userLoveService.getLoveListByUserId(
        parseObjectId(id),
        order === orderConstant.DESCENDING ? true : false,
      );
      if (result.success) {
        return res.send({message: result.message, data: result.data});
      }
      return res.status(400).send({message: result.message});
    } catch (error) {
      return res
        .status(500)
        .send({message: 'Internal error in getLoveListByUserId'});
    }
  };

  toggleLoveItem = async (req: Request, res: Response) => {
    try {
      const {userId, destId, flag} = req.body;
      if(!userId || !destId || typeof flag !== 'boolean') {
        return res.status(400).send({message: 'Missing parameter(s)'})
      }
      await this.userLoveService.toggleLoveItem(userId, destId, flag);
      return res.send({message: 'Toggled love item'});
    } catch (error) {
      return res
        .status(500)
        .send({message: 'Internal error in toggleLoveItem'});
    }
  };

  addLoveItem = async (req: Request, res: Response) => {
    try {
      const {userId, destId} = req.body;
      if (!userId || !destId) {
        return res.status(400).send({message: 'Missing parameter(s)'});
      }

      const result = await this.userLoveService.addLoveItem(
        parseObjectId(userId),
        parseObjectId(destId),
      );

      if (result.success) {
        return res.send({message: result.message, data: result.data});
      }

      return res.status(400).send({message: result.message});
    } catch (error) {
      return res.status(500).send({message: 'Internal error in addLoveItem'});
    }
  };

  removeLoveItem = async (req: Request, res: Response) => {
    try {
      const {userId, destId} = req.body;
      if (!userId || !destId) {
        return res.status(400).send({message: 'Missing parameter(s)'});
      }

      const result = await this.userLoveService.removeLoveItem(
        parseObjectId(userId),
        parseObjectId(destId),
      );
      return res
        .status(result.success ? 200 : 400)
        .send({message: result.message});
    } catch (error) {
      return res
        .status(500)
        .send({message: 'Internall error in removeLoveItem'});
    }
  };

  checkUserLoveDestination = async (req: Request, res: Response) => {
    const {userId, destId} = req.params;
    if (!userId || !destId)
      return res.status(400).send({message: 'Missing parameter(s)'});
    const result = await this.userLoveService.checkUserLoveDestination(
      userId,
      destId,
    );
    return res.status(result.success ? 200 : 400).send({message: result.message});
  };
}

export default UserLoveController;
