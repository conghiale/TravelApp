import mongoose from 'mongoose';
import User from '../models/user-model';
import UserLove from '../models/user-love-model';
import Destination from '../models/destination-model';
import DestinationService from './destination-service';

class UserLoveService {
  getLoveListByUserId = async (
    userId: mongoose.Types.ObjectId,
    flag: boolean,
  ) => {
    if (!(await User.findById(userId))) {
      return {
        success: false,
        message: 'User does not exist',
      };
    }

    const promises = (
      await UserLove.find({userId}, {__v: 0})
        .sort({
          createdAt: flag ? -1 : 1,
        })
        .lean()
    ).map(async d => ({
      ...d,
      lovedDest: {
        ...(await Destination.findById(d.destinationId, {
          __v: 0,
          _id: 0,
        }).lean()),
        images: await new DestinationService().getImagesByDestinationId(
          d.destinationId,
        ),
      },
    }));
    const data = await Promise.all(promises);

    return {
      success: true,
      message: 'Get all user love list successfully',
      data,
    };
  };

  toggleLoveItem = async (
    userId: mongoose.Types.ObjectId,
    destinationId: mongoose.Types.ObjectId,
    flag: boolean,
  ) => {
    if (flag) {
      if (!(await UserLove.findOne({userId, destinationId}))) {
        await UserLove.create({
          userId,
          destinationId,
        });
      }
    } else {
      if (!(await UserLove.findOne({userId, destinationId}))) {
        await UserLove.deleteOne({
          userId,
          destinationId,
        });
      }
    }
  };

  addLoveItem = async (
    userId: mongoose.Types.ObjectId,
    destinationId: mongoose.Types.ObjectId,
  ) => {
    if (
      !(await User.findById(userId)) ||
      !(await Destination.findById(destinationId))
    ) {
      return {
        success: false,
        message: 'User or destination does not exist',
      };
    }

    if (!(await UserLove.findOne({userId, destinationId}))) {
      const data = await UserLove.create({
        userId,
        destinationId,
      });

      return {
        success: true,
        message: 'Add love item successfully',
        data,
      };
    } else {
      return {
        success: false,
        message: 'This love item already exist',
      };
    }
  };
  removeLoveItem = async (
    userId: mongoose.Types.ObjectId,
    destinationId: mongoose.Types.ObjectId,
  ) => {
    if (!(await UserLove.findOne({userId, destinationId}))) {
      return {
        success: false,
        message: 'Love item does not exist',
      };
    }

    if (await UserLove.findOne({userId, destinationId})) {
      await UserLove.deleteOne({
        userId,
        destinationId,
      });
      return {
        success: true,
        message: 'Remove love item successfully',
      };
    }

    return {
      success: false,
      message: 'Love item does not exist',
    };
  };
}

export default UserLoveService;
