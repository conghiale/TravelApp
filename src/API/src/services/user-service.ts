import User from '../models/user-model';
import mongoose, {Types} from 'mongoose';
import jwt from 'jsonwebtoken';
import {
  avatarConstant,
  languageConstant,
  roleConstant,
  themeConstant,
} from '../utils/constant';
import Validation from '../models/validation-model';
import {sendMail} from '../utils/mailer';
import {bcryptHash, bcryptCompare} from '../utils/password';
import DestinationType from '../models/destination-type-model';

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
    await Validation.deleteMany({email});
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
    const existingUser = await User.find({email}, {__v: 0});

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
      language: languageConstant.EN,
      avatar: avatarConstant.DEFAULT,
      theme: themeConstant.DARK,
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
          firstName: createdUser.firstName,
          lastName: createdUser.lastName,
          role: createdUser.role,
          language: createdUser.language,
          lock: createdUser.lock,
          avatar: createdUser.avatar,
          isFirstTime: createdUser.isFirstTime,
          hobby: createdUser.hobby,
          theme: createdUser.theme,
        },
      },
    };
  };

  loginUser = async (email: string, password: string) => {
    const existingUser = await User.findOne({email}, {__v: 0});

    if (!existingUser) {
      return {
        success: false,
        message: 'User does not exist',
      };
    }

    if (existingUser.lock) {
      return {
        success: false,
        message: 'Your account has been locked',
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
            firstName: existingUser.firstName,
            lastName: existingUser.lastName,
            role: existingUser.role,
            language: existingUser.language,
            lock: existingUser.lock,
            avatar: existingUser.avatar,
            isFirstTime: existingUser.isFirstTime,
            hobby: existingUser.hobby,
            theme: existingUser.theme,
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
    typesString: string,
    language: string,
    theme: string,
  ) => {
    const user = await User.findById(userId, {__v: 0});
    if (!user) {
      return {
        success: false,
        message: 'User does not exist',
      };
    }
    if (firstName) user.firstName = firstName;
    if (lastName) user.lastName = lastName;
    if (typesString) {
      let types = typesString
        .split(',')
        .map(t => new mongoose.Types.ObjectId(t));
      for (let i = 0; i < types.length; ++i) {
        if (!DestinationType.findById(types[i])) {
          return {
            success: false,
            message: 'At least one destination type is not exist',
          };
        }
      }
      console.log(typesString);
      user.hobby = types;
    }
    if (language) {
      user.language = language;
    }
    if (theme) {
      user.theme = theme;
    }
    //when this api called, user is not first time more
    user.isFirstTime = false;
    user.save();

    return {
      success: true,
      message: 'Update user successfully',
      data: user,
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
    const users = await User.find(
      {role: roleConstant.USER},
      {password: 0, __v: 0},
    );

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

  createUpdateUserHobby = async (
    email: string,
    destinationTypeIds: mongoose.Types.ObjectId[],
  ) => {
    const user = await User.findOne({email});
    if (!user) {
      return {
        success: false,
        message: 'User does not exist',
      };
    }

    for (let i = 0; i < destinationTypeIds.length; ++i) {
      const foundDestType = await DestinationType.findById(
        destinationTypeIds[i],
      );
      if (!foundDestType) {
        return {
          success: false,
          message: 'At least having one invalid destination type',
        };
      }
    }

    user.hobby = destinationTypeIds;
    user.save();

    return {
      success: true,
      message: 'Create user hobby successfully',
      data: {
        email: user.email,
        hobby: await DestinationType.find({_id: {$in: user.hobby}}),
      },
    };
  };

  changePassword = async (email: string, current: string, change: string) => {
    const user = await User.findOne({email});
    if (!user) {
      return {
        success: false,
        message: 'User does not exist',
      };
    }

    if (!(await bcryptCompare(current, user.password))) {
      return {
        success: false,
        message: 'Wrong current password',
      };
    }

    const hashedPassword = await bcryptHash(change);
    user.password = hashedPassword;
    user.save();
    return {
      success: true,
      message: 'Change password successfully',
    };
  };

  getAllUserHobby = async (userId: string) => {
    const existingUser = await User.findById(userId);
    if (!existingUser) {
      return {
        success: false,
        message: 'User does not exist',
      };
    }

    const hobbies = await DestinationType.find(
      {_id: {$in: existingUser.hobby}},
      {__v: 0},
    );
    return {
      success: true,
      message: 'Get all user hobby successfully',
      data: hobbies,
    };
  };
}

export default UserService;
