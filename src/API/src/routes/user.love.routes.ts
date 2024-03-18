import express from 'express';
import UserLoveController from '../controllers/user.love.controller';
import {authenticationMiddleware} from '../middleware';

const userLoveController = new UserLoveController();
const userLoveRoutes = express.Router();

userLoveRoutes.use(authenticationMiddleware);
userLoveRoutes.route('/:id/:order').get(userLoveController.getLoveListByUserId);
userLoveRoutes.route('/toggle').post(userLoveController.toggleLoveItem);
userLoveRoutes.route('/add').post(userLoveController.addLoveItem);
userLoveRoutes.route('/remove').delete(userLoveController.removeLoveItem);
userLoveRoutes
  .route('/check/:userId/:destId')
  .get(userLoveController.checkUserLoveDestination);

export default userLoveRoutes;
