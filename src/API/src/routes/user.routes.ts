import express from 'express';
import UserController from '../controllers/user.controller';
import {authenticationMiddleware} from '../middleware';

const userController = new UserController();
const userRoutes = express.Router();

userRoutes.route('/validation').post(userController.markUserValidation);
userRoutes.route('/create').post(userController.createUser);
userRoutes.route('/login').put(userController.loginUser);
userRoutes.route('/reset-password').put(userController.getLinkResetPassword);
userRoutes.route('/reset-password').post(userController.resetPassword);

// userRoutes.use(authenticationMiddleware);
userRoutes.route('/lock').post(userController.toggleLockUser);
userRoutes.route('/get-all').get(userController.getAllUser);
userRoutes.route('/get/:id').get(userController.getUserById);
userRoutes.route('/edit/:id').put(userController.editUserById);
// userRoutes.route('/upload-avatar/:id').post(userController.uploadAvatar);

export default userRoutes;
