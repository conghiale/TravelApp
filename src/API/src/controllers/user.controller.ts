import {Request, Response} from 'express';
import mongoose from 'mongoose';
import {IUser} from '../types';
import {sendMail} from '../utils/mailer';
import {uploadFile} from '../utils/upload';
import UserService from '../services/user-service';
import User from '../models/user-model';
const fs = require('fs');

type InputField = {
  email: string;
  types: string;
};

class UserController {
  private userService: UserService;

  constructor() {
    this.userService = new UserService();
  }

  markUserValidation = async (req: Request, res: Response) => {
    try {
      const {email} = req.body;
      if (!email)
        return res.status(400).send({message: 'Missing parameter(s)'});
      await this.userService.markUserValidation(email);
      return res.send({message: 'Create code validation successfully'});
    } catch (error) {
      return res
        .status(500)
        .send({message: 'Internal error in markUserValidation'});
    }
  };

  createUser = async (req: Request, res: Response) => {
    try {
      const {firstName, lastName, email, password, codeValidation}: IUser =
        req.body;
      if (!firstName || !lastName || !email || !password) {
        return res.status(400).send({message: 'Missing parameter(s)'});
      }

      if (!(await this.userService.hasCodeValidation(email, codeValidation))) {
        return res
          .status(400)
          .send({message: 'Wrong code validation or it has expired'});
      }

      const result = await this.userService.createUser(
        firstName,
        lastName,
        email,
        password,
      );

      if (result.success) {
        return res
          .status(201)
          .send({message: result.message, data: result.data});
      }
      return res.status(400).send({message: result.message});
    } catch (error) {
      return res.status(500).send({message: 'Internal error in createUser'});
    }
  };

  loginUser = async (req: Request, res: Response) => {
    try {
      const {email, password}: IUser = req.body;
      console.log(email, password);
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
      if (!id) return res.status(400).send({message: 'Missing parameter(s)'});
      const {firstName, lastName, typesString, language, theme}: IUser =
        req.body;

      const result = await this.userService.editUserById(
        id,
        firstName,
        lastName,
        typesString,
        language,
        theme,
      );

      if (result.success)
        return res.send({message: result.message, data: result.data});
      return res.status(400).send({message: result.message});
    } catch (error) {
      return res.status(500).send({message: 'Internal error in editUserById'});
    }
  };

  toggleLockUser = async (req: Request, res: Response) => {
    try {
      const {email}: IUser = req.body;
      const result = await this.userService.toggleLockUser(email);
      return res
        .status(result.success ? 200 : 400)
        .send({message: result.message});
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
      const {id} = req.params;
      if (!id) {
        return res.status(400).send({message: 'Missing parameter(s)'});
      }
      const result = await this.userService.getUserById(id);
      if (result.success)
        return res.send({message: result.message, data: result.data});
      return res.status(400).send({message: result.message});
    } catch (error) {
      return res.status(500).send({
        message: `Error in getUserById: ${error}`,
      });
    }
  };

  uploadAvatar = async (req: Request, res: Response) => {
    const {id} = req.params;
    const storedDir = `src/resources/avatar/${id}`;

    if (!fs.existsSync(storedDir)) {
      fs.mkdirSync(storedDir, {recursive: true});
    }

    uploadFile(storedDir)(req, res, async (err: any) => {
      if (err) {
        return res.status(400).json({message: err});
      }
      await User.findByIdAndUpdate({_id: id}, {avatar: `${id}/${req.file.originalname}`})
      // handleUpload(req, res);
      res.send({message: 'Upload file successfully', data: req.file});
    });
  };

  getLinkResetPassword = async (req: Request, res: Response) => {
    try {
      const {email} = req.body;
      if (!email)
        return res.status(400).send({message: 'Missing parameter(s)'});

      const hasUser = await this.userService.checkUserByEmail(email);
      if (!hasUser)
        return res.status(400).send({message: 'User does not exist'});

      const validationCode = await this.userService.markUserValidation(email);
      sendMail(
        email,
        '[Travel-App] Reset password (DO NOT share this for anyone)',
        `Your RESET PASSWORD link: <a href='http://localhost:1702/reset-password/${email}/${validationCode}'>${email}</a>`,
      );
      return res.send({message: 'Link reset password sent'});
    } catch (error) {
      return res.status(500).send({
        message: 'Internal error in getLinkResetPassword',
      });
    }
  };

  resetPassword = async (req: Request, res: Response) => {
    try {
      const {email, newPassword, code} = req.body;
      if (!email || !newPassword || !code) {
        return res.status(400).send({
          message: 'Missing parameter(s)',
        });
      }
      const result = await this.userService.resetPassword(
        email,
        newPassword,
        code,
      );
      return res
        .status(result.success ? 200 : 400)
        .send({message: result.message});
    } catch (error) {
      return res.status(500).send({
        message: 'Internal error in resetPassword',
      });
    }
  };

  createUpdateUserHobby = async (req: Request, res: Response) => {
    try {
      const {email, types}: InputField = req.body;

      if (!email || !types) {
        return res.status(400).send({message: 'Missing parameter(s)'});
      }

      const typesArray = types.split(',');
      const typesObjectIdArray = typesArray.map(
        typeIdStr => new mongoose.Types.ObjectId(typeIdStr),
      );
      const result = await this.userService.createUpdateUserHobby(
        email,
        typesObjectIdArray,
      );

      if (result.success) {
        return res.send({message: result.message, data: result.data});
      }
      return res.status(400).send({message: result.message});
    } catch (error) {
      return res.status(500).send({
        message: 'Internal error in createUpdateUserHobby',
      });
    }
  };

  getAllUserHobby = async (req: Request, res: Response) => {
    try {
      const {id} = req.params;
      const result = await this.userService.getAllUserHobby(id);
      if (result.success) {
        return res.send({message: result.message, data: result.data});
      }
      return res.status(400).send({message: result.message});
    } catch (error) {
      return res
        .status(500)
        .send({message: 'Internal error in getAllUserHobby'});
    }
  };

  changePassword = async (req: Request, res: Response) => {
    try {
      const {email, current, change} = req.body;
      const result = await this.userService.changePassword(
        email,
        current,
        change,
      );
      return res
        .status(result.success ? 200 : 400)
        .send({message: result.message});
    } catch (error) {
      return res
        .status(500)
        .send({message: 'Internal error in changePassword'});
    }
  };
}

export default UserController;
