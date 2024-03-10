import User from '../models/user-model';
import {Types} from 'mongoose';
import jwt from 'jsonwebtoken';
import {
  avatarConstant,
  languageConstant,
  roleConstant,
} from '../utils/constant';
import Validation from '../models/validation-model';
import {sendMail} from '../utils/mailer';
import {bcryptHash, bcryptCompare} from '../utils/password';

class UserService {
  getUserToken = (_id: string | Types.ObjectId) => {
    const authenticatedUserToken = jwt.sign({_id}, 'express', {
      expiresIn: '7d',
    });
    return authenticatedUserToken;
  };

  generateCodeValidation = () =>
    Math.floor(100000 + Math.random() * 900000).toString();

  markUserValidation = async (email: string) => {
    const genCode = this.generateCodeValidation();
    await Validation.create({
      email: email,
      code: genCode,
    });
    await sendMail(
      email,
      '[Travel-App] Your validation code (DO NOT share this for anyone)',
      genCode,
    );
    return genCode;
  };

  hasCodeValidation = async (email: string, code: string) => {
    const exist = await Validation.findOne({email, code});
    if (exist) {
      return true;
    }
    return false;
  };

  cleanCodeValidation = async (email: string) => {
    await Validation.deleteMany({email});
  };

  createUser = async (
    firstName: string,
    lastName: string,
    email: string,
    password: string,
  ) => {
    const existingUser = await User.find({email});

    if (existingUser && existingUser.length !== 0) {
      return {
        success: false,
        message: 'User already exist',
      };
    }

    // const hashedPassword = await bcrypt.hash(password, 12);
    const hashedPassword = await bcryptHash(password);
    const createdUser = await User.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      role: roleConstant.USER,
      language: languageConstant.VI,
      avatar: avatarConstant.DEFAULT,
    });

    await this.cleanCodeValidation(email);

    return {
      success: true,
      message: 'User created successfully',
      data: {
        token: this.getUserToken(createdUser._id),
        user: {
          id: createdUser._id.toString(),
          email: createdUser.email,
          name:
            createdUser.language === 'EN'
              ? `${createdUser.firstName} ${createdUser.lastName}`
              : `${createdUser.lastName} ${createdUser.firstName}`,
          role: createdUser.role,
          language: createdUser.language,
          lock: createdUser.lock,
          avatar: createdUser.avatar,
          isFirstTime: createdUser.isFirstTime,
        },
      },
    };
  };

  loginUser = async (email: string, password: string) => {
    const existingUser = await User.findOne({email});

    if (!existingUser) {
      return {
        success: false,
        message: 'User does not exist',
      };
    }

    const isPasswordIdentical = await bcryptCompare(
      password,
      existingUser.password,
    );

    if (isPasswordIdentical) {
      const token = this.getUserToken(existingUser._id);
      return {
        success: true,
        message: 'Login successfully',
        data: {
          token,
          user: {
            id: existingUser._id.toString(),
            email: existingUser.email,
            name:
              existingUser.language === 'EN'
                ? `${existingUser.firstName} ${existingUser.lastName}`
                : `${existingUser.lastName} ${existingUser.firstName}`,
            role: existingUser.role,
            language: existingUser.language,
            lock: existingUser.lock,
            avatar: existingUser.avatar,
            isFirstTime: existingUser.isFirstTime,
          },
        },
      };
    }

    return {
      success: false,
      message: 'Wrong credentials',
    };
  };

  editUserById = async (
    userId: string,
    firstName: string,
    lastName: string,
  ) => {
    const user = await User.findById(userId);
    if (user) {
      if (firstName) user.firstName = firstName;
      if (lastName) user.lastName = lastName;
      user.save();

      return {
        success: true,
        message: 'Update user successfully',
      };
    }

    return {
      success: false,
      message: 'User does not exist',
    };
  };

  toggleLockUser = async (email: string) => {
    const user = await User.findOne({email});
    if (!user) {
      return {
        success: false,
        message: 'User does not exist',
      };
    }

    user.lock = !user.lock;
    user.save();

    return {
      success: true,
      message: 'Toggled locking user',
    };
  };

  toggleChangeLanguage = async (email: string) => {
    const user = await User.findOne({email});

    if (!user) {
      return {
        success: false,
        message: 'User does not exist',
      };
    }

    if (user.language === languageConstant.EN) {
      user.language = languageConstant.VI;
    } else if (user.language === languageConstant.VI) {
      user.language = languageConstant.EN;
    } else {
      return {
        success: false,
        message: 'Invalid language of user',
      };
    }
    user.save();

    return {
      success: true,
      message: 'Change language successfully',
    };
  };

  getAllUser = async () => {
    const users = await User.find({}, {password: 0});

    if (users && users.length > 0) {
      return {
        success: true,
        message: 'Get all users successfully',
        data: users,
      };
    } else {
      return {
        success: false,
        message: 'Do not have any users',
        data: [],
      };
    }
  };

  getUserById = async (id: any) => {
    const foundUser = await User.findById(id, {password: 0});
    if (foundUser) {
      return {
        success: true,
        message: 'Get user by id successfully',
        data: foundUser,
      };
    }

    return {
      success: false,
      message: 'User does not exist',
    };
  };

  resetPassword = async (email: string, newPassword: string, code: string) => {
    const validCode = await this.hasCodeValidation(email, code);
    if (!validCode) {
      return {
        success: false,
        message: 'Invalid input',
      };
    }

    const user = await User.findOne({email});
    if (!user) {
      return {
        success: false,
        message: 'User does not exist',
      };
    }

    user.password = await bcryptHash(newPassword);
    user.save();
    await this.cleanCodeValidation(email);

    return {
      success: true,
      message: 'Password resetted',
    };
  };

  checkUserByEmail = async (email: string) => {
    const foundUser = await User.findOne({email});
    if (!foundUser) {
      return false;
    }
    return true;
  };
}

export default UserService;
