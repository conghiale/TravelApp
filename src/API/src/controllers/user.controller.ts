import {Request, Response} from 'express';
import mongoose from 'mongoose';
import {IUser} from '../types';
import {sendMail} from '../utils/mailer';
import {handleUpload, uploadFile} from '../utils/upload';
import UserService from '../services/user-service';
const fs = require('fs');

type InputField = {
  email: string
  types: string;
}

class UserController {
  private userService: UserService;

  constructor() {
    this.userService = new UserService();
  }

  markUserValidation = async (req: Request, res: Response) => {
    try {
      const {email} = req.body;
      if(!email) return res.status(400).send({message: 'Missing parameter(s)'});
      await this.userService.markUserValidation(email);
      return res.send({message: 'Create code validation successfully'})
    } catch (error) {
      return res.status(500).send({message: 'Internal error in markUserValidation'});
    }
  };

  createUser = async (req: Request, res: Response) => {
    try {
      const {firstName, lastName, email, password, codeValidation}: IUser = req.body;
      if (!firstName || !lastName || !email || !password) {
        return res.status(400).send({message: 'Missing parameter(s)'});
      }

      if(!await this.userService.hasCodeValidation(email, codeValidation)) {
        return res.status(400).send({message: 'Wrong code validation or it has expired'})
      }

      const result = await this.userService.createUser(
        firstName,
        lastName,
        email,
        password,
      );

      if (result.success) {
        return res.status(201).send({message: result.message, data: result.data});
      }
      return res.status(400).send({message: result.message});
    } catch (error) {
      console.log(error)
      return res.status(500).send({message: 'Internal error in createUser'});
    }
  };

  loginUser = async (req: Request, res: Response) => {
    try {
      const {email, password}: IUser = req.body;
      console.log(email, password)
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

      return res.status(result.success ? 200 : 400).send({message: result.message});
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
    console.log(req.body)
    const storedDir = `src/resources/avatar/${id}`;

    if (!fs.existsSync(storedDir)) {
      fs.mkdirSync(storedDir, {recursive: true});
      console.log(`Directory ${storedDir} created.`);
    }

    uploadFile(storedDir)(req, res, (err: any) => {
      if (err) {
        return res.status(400).json({message: err});
      }
      console.log('body1:', req.body)
      handleUpload(req, res);
    });
  };

  getLinkResetPassword = async (req: Request, res: Response) => {
    try {
      const {email} = req.body;
      if(!email) return res.status(400).send({message: 'Missing parameter(s)'});

      const hasUser = await this.userService.checkUserByEmail(email);
      if(!hasUser) return res.status(400).send({message: 'User does not exist'});

      const validationCode = await this.userService.markUserValidation(email);
      sendMail(
        email,
        '[Travel-App] Reset password (DO NOT share this for anyone)',
        `Your RESET PASSWORD link: <a href='http://localhost:1702/reset-password/${email}/${validationCode}'>${email}</a>`,
      );
      return res.send({message: 'Link reset password sent'})
    } catch (error) {
      return res.status(500).send({
        message: 'Internal error in getLinkResetPassword'
      })
    }
  };

  resetPassword = async (req: Request, res: Response) => {
    try {
      const {email, newPassword, code} = req.body;
      if(!email || !newPassword || !code) {
        return res.status(400).send({
          message: 'Missing parameter(s)'
        })
      }
      const result = await this.userService.resetPassword(email, newPassword, code);
      return res.status(result.success ? 200 : 400).send({message: result.message});
    } catch (error) {
      return res.status(500).send({
        message: 'Internal error in resetPassword'
      })
    }
  };

  createUpdateUserHobby = async (req: Request, res: Response) => {
    try {
      const {email, types}:InputField = req.body;

      if(!email || !types) {
        return res.status(400).send({message: 'Missing parameter(s)'})
      }

      const typesArray = types.split(',');
      const typesObjectIdArray = typesArray.map((typeIdStr) => new mongoose.Types.ObjectId(typeIdStr))
      const result = await this.userService.createUpdateUserHobby(email, typesObjectIdArray);
      
      if(result.success) {
        return res.send({message: result.message, data: result.data})
      }
      return res.status(400).send({message: result.message})
    } catch (error) {
      return res.status(500).send({
        message: 'Internal error in createUpdateUserHobby'
      })
    }
  };
}

export default UserController;
