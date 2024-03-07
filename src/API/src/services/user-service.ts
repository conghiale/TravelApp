import User from '../models/user-model';
import {Types} from 'mongoose';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import {
  avatarConstant,
  languageConstant,
  roleConstant,
} from '../utils/constant';

class UserService {
  getUserToken = (_id: string | Types.ObjectId) => {
    const authenticatedUserToken = jwt.sign({_id}, 'express', {
      expiresIn: '7d',
    });
    return authenticatedUserToken;
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

    const hashedPassword = await bcrypt.hash(password, 12);
    await User.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      role: roleConstant.USER,
      language: languageConstant.VI,
      avatar: avatarConstant.DEFAULT,
    });
    return {
      success: true,
      message: 'User created successfully',
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

    const isPasswordIdentical = await bcrypt.compare(
      password,
      (
        await existingUser
      ).password,
    );

    if (isPasswordIdentical) {
      const token = this.getUserToken(existingUser._id);
      return {
        success: true,
        message: 'Login successfully',
        data: {
          token,
          user: {
            email: existingUser.email,
            name:
              existingUser.language === 'EN'
                ? `${existingUser.firstName} ${existingUser.lastName}`
                : `${existingUser.lastName} ${existingUser.firstName}`,
            role: existingUser.role,
            language: existingUser.language,
            lock: existingUser.lock,
            avatar: existingUser.avatar,
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

    if (user.language === languageConstant.EN)
      user.language = languageConstant.VI;
    else if (user.language === languageConstant.VI)
      user.language = languageConstant.EN;
    else
      return {
        success: false,
        message: 'Invalid language of user',
      };
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
}

export default UserService;
