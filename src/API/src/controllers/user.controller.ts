import {Request, Response} from 'express';
import mongoose, {Types} from 'mongoose';
import {IUser} from '../types';
import {sendMail} from '../utils/mailer';
import {handleUpload, uploadFile} from '../utils/upload';
import UserService from '../services/user-service';
const fs = require('fs');

class UserController {
  private userService: UserService;

  constructor() {
    this.userService = new UserService();
  }

  

  createUser = async (req: Request, res: Response) => {
    try {
      const {firstName, lastName, email, password}: IUser = req.body;
      if (!firstName || !lastName || !email || !password) {
        return res.status(400).send({message: 'Missing parameter(s)'});
      }

      const result = await this.userService.createUser(
        firstName,
        lastName,
        email,
        password,
      );

      if (result.success) {
        return res.status(201).send({message: result.message});
      }
      return res.status(400).send({message: result.message});
    } catch (error) {
      return res.status(500).send({message: 'Internal error in createUser'});
    }
  };

  loginUser = async (req: Request, res: Response) => {
    try {
      const {email, password}: IUser = req.body;
      const result = await this.userService.loginUser(email, password);

      if (result.success) {
        return res.send({
          message: result.message,
          data: result.data,
        });
      }
      return res.status(400).send({message: result.message});
    } catch (error) {
      return res.status(500).send({message: 'Internal error in loginUser'});
    }
  };

  editUserById = async (req: Request, res: Response) => {
    try {
      const {id} = req.params;
      const {firstName, lastName}: IUser = req.body;

      if (!id || !firstName || !lastName) {
        return res.status(400).send({
          message: 'Missing parameter(s)',
        });
      }

      const result = await this.userService.editUserById(
        id,
        firstName,
        lastName,
      );
      if (result) {
        return res.status(200).send({message: result.message});
      }
      return res.status(400).send({message: result.message});
    } catch (error) {
      console.log('Error in updateUser:', error);
      return res.status(500).send({message: 'Internal error in editUserById'});
    }
  };

  toggleLockUser = async (req: Request, res: Response) => {
    try {
      const {email}: IUser = req.body;
      const result = await this.userService.toggleLockUser(email);
      if (result.success)
        return res.status(200).send({message: result.message});
      return res.status(400).send({message: result.message});
    } catch (error) {
      return res
        .status(500)
        .send({message: 'Internal error in toggleLockUser'});
    }
  };

  toggleChangeLanguage = async (req: Request, res: Response) => {
    try {
      const {email}: IUser = req.body;
      const result = await this.userService.toggleChangeLanguage(email);

      if (result.success) return res.send({message: result.message});
      return res.status(400).send({message: result.message});
    } catch (error) {
      return res
        .status(500)
        .send({message: 'Internal error in toggleLockUser'});
    }
  };

  sendEmail = (req: Request, res: Response) => {
    try {
      sendMail(
        'quangnttwin@gmail.com',
        '[Travel-App] Test send mail',
        "<a href='google.com'>Go to google</a>",
      );

      return res.send({
        message: 'Send email successfully',
      });
    } catch (error) {
      return res.status(500).send({message: 'Internal error in sendEmail'});
    }
  };

  getAllUser = async (req: Request, res: Response) => {
    try {
      const result = await this.userService.getAllUser();
      return res.send({
        message: result.message,
        data: result.data,
      });
    } catch (error) {
      return res.status(500).send({message: 'Internal error in getAllUser'});
    }
  };

  getUserById = async (req: Request, res: Response) => {
    try {
      const id = new mongoose.Types.ObjectId(req.params.id);
      const result = await this.userService.getUserById(id);

      if (result.success)
        return res.send({message: result.message, data: result.data});
      return res.status(400).send({message: result.message});
    } catch (error) {
      return res.status(500).send({
        isSuccess: false,
        message: `Error in getUserById: ${error}`,
      });
    }
  };

  uploadAvatar = async (req: Request, res: Response) => {
    const {id} = req.params;
    const storedDir = `src/resources/avatar/${id}`;

    if (!fs.existsSync(storedDir)) {
      fs.mkdirSync(storedDir, {recursive: true});
      console.log(`Directory ${storedDir} created.`);
    }

    uploadFile(storedDir)(req, res, (err: any) => {
      if (err) {
        return res.status(400).json({message: err});
      }
      handleUpload(req, res);
    });
  };
}

export default UserController;
