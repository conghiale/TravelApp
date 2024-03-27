import mongoose from 'mongoose';
import ApprovePlace from '../models/approve-place-model';
import User from '../models/user-model';

class ApprovedPlaceService {
  getApprovePlaceByDestinationId = async (
    destinationId: mongoose.Types.ObjectId,
  ) => {
    const cmts = await ApprovePlace.find(
      {
        destinationId: destinationId
      },
      { __v: 0 },
    ).sort({ updatedAt: -1 });

    const data = await Promise.all(
      cmts.map(async cmt => {
        const daytimeCreated = new Date(cmt.createdAt);
        const daytimeUpdate = new Date(cmt.updatedAt);

        return {
          _id: cmt._id,
          userId: cmt.userId,
          destinationId: cmt.destinationId,
          status: cmt.status,
          createdAt:
            daytimeCreated.getDate() +
            '-' +
            daytimeCreated.getMonth() +
            1 +
            '-' +
            daytimeCreated.getFullYear() +
            ' | ' +
            daytimeCreated.getHours() +
            ':' +
            daytimeCreated.getMinutes() +
            ':' +
            daytimeCreated.getSeconds(),
          updatedAt:
            daytimeUpdate.getDate() +
            '-' +
            daytimeUpdate.getMonth() +
            1 +
            '-' +
            daytimeUpdate.getFullYear() +
            ' | ' +
            daytimeUpdate.getHours() +
            ':' +
            daytimeUpdate.getMinutes() +
            ':' +
            daytimeUpdate.getSeconds(),
          email: (await User.findById(cmt.userId)).email,
          avatar: (await User.findById(cmt.userId)).avatar,
        };
      }),
    );

    if (cmts && cmts.length > 0) {
      return {
        message: 'Get all comments by destination successfully',
        data: data,
      };
    }

    return {
      message: 'Do not have any comments by destination',
      data: [],
    };
  };

  getAllApprovePlace = async () => {
    const cmts = await ApprovePlace.find().sort({ updatedAt: -1 });

    const data = await Promise.all(
      cmts.map(async cmt => {
        const daytimeCreated = new Date(cmt.createdAt);
        const daytimeUpdate = new Date(cmt.updatedAt);

        return {
          _id: cmt._id,
          userId: cmt.userId,
          destinationId: cmt.destinationId,
          status: cmt.status,
          createdAt:
            daytimeCreated.getDate() +
            '-' +
            daytimeCreated.getMonth() +
            1 +
            '-' +
            daytimeCreated.getFullYear() +
            ' | ' +
            daytimeCreated.getHours() +
            ':' +
            daytimeCreated.getMinutes() +
            ':' +
            daytimeCreated.getSeconds(),
          updatedAt:
            daytimeUpdate.getDate() +
            '-' +
            daytimeUpdate.getMonth() +
            1 +
            '-' +
            daytimeUpdate.getFullYear() +
            ' | ' +
            daytimeUpdate.getHours() +
            ':' +
            daytimeUpdate.getMinutes() +
            ':' +
            daytimeUpdate.getSeconds(),
          email: (await User.findById(cmt.userId)).email,
          avatar: (await User.findById(cmt.userId)).avatar,
        };
      }),
    );

    if (cmts && cmts.length > 0) {
      return {
        message: 'Get all comments by destination successfully',
        data: data,
      };
    }

    return {
      message: 'Do not have any comments by destination',
      data: [],
    };
  };

  createApprovePlace = async (
    userId: mongoose.Types.ObjectId[],
    destinationId: mongoose.Types.ObjectId,
    status: number,
  ) => {
    try {
      const approvePlace = await ApprovePlace.create({
        userId,
        destinationId,
        status,
      });

      const daytimeCreated = new Date(approvePlace.createdAt);
      const daytimeUpdate = new Date(approvePlace.updatedAt);

      const data = {
        _id: approvePlace._id.toString(),
        userId: approvePlace.userId,
        destinationId: approvePlace.destinationId.toString(),
        status: approvePlace.status,
        createdAt:
          daytimeCreated.getDate() +
          '-' +
          daytimeCreated.getMonth() +
          1 +
          '-' +
          daytimeCreated.getFullYear() +
          ' | ' +
          daytimeCreated.getHours() +
          ':' +
          daytimeCreated.getMinutes() +
          ':' +
          daytimeCreated.getSeconds(),
        updatedAt:
          daytimeUpdate.getDate() +
          '-' +
          daytimeUpdate.getMonth() +
          1 +
          '-' +
          daytimeUpdate.getFullYear() +
          ' | ' +
          daytimeUpdate.getHours() +
          ':' +
          daytimeUpdate.getMinutes() +
          ':' +
          daytimeUpdate.getSeconds(),
        email: (await User.findById(approvePlace.userId)).email,
        avatar: (await User.findById(approvePlace.userId)).avatar,
      };

      return {
        message: 'Create comment successfully',
        data: data,
      };
    } catch (error) {
      return {
        data: [],
        message: 'Comment cannot create',
      };
    }
  };

  updateApprovePlace = async (
    id: mongoose.Types.ObjectId,
    userId: mongoose.Types.ObjectId[],
    status: number,
  ) => {
    try {
      const approvePlace = await ApprovePlace.findById(id);
      approvePlace.userId = userId
      approvePlace.status = status
      approvePlace.save();

      const daytimeUpdate = new Date(approvePlace.updatedAt);

      return {
        message: 'Update approved place successfully',
        data: {
          userId: approvePlace.userId,
          destinationId: approvePlace.destinationId,
          stauts: approvePlace.status,
          updatedAt:
            daytimeUpdate.getDate() +
            '-' +
            daytimeUpdate.getMonth() +
            1 +
            '-' +
            daytimeUpdate.getFullYear() +
            ' | ' +
            daytimeUpdate.getHours() +
            ':' +
            daytimeUpdate.getMinutes() +
            ':' +
            daytimeUpdate.getSeconds(),
        },
      };
    } catch (error) {
      return {
        data: [],
        message: 'Comment cannot Update',
      };
    }
  };

  updateUsersByDestinationId = async (
    destinationId: mongoose.Types.ObjectId,
    userId: mongoose.Types.ObjectId,
  ) => {
    try {
      const approvePlace = await ApprovePlace.findOne({ destinationId: destinationId });
      approvePlace.userId = [...approvePlace.userId, userId]
      approvePlace.save();

      const daytimeUpdate = new Date(approvePlace.updatedAt);

      console.log('APPROVE-PLACE-SERVICE: ' + JSON.stringify(approvePlace.userId));
      return {
        message: 'Update approved place successfully',
        data: {
          userId: approvePlace.userId,
          destinationId: approvePlace.destinationId,
          stauts: approvePlace.status,
          updatedAt:
            daytimeUpdate.getDate() +
            '-' +
            daytimeUpdate.getMonth() +
            1 +
            '-' +
            daytimeUpdate.getFullYear() +
            ' | ' +
            daytimeUpdate.getHours() +
            ':' +
            daytimeUpdate.getMinutes() +
            ':' +
            daytimeUpdate.getSeconds(),
        },
      };
    } catch (error) {
      return {
        data: [],
        message: 'Comment cannot Update',
      };
    }
  };

  updateStatusByDestinationId = async (
    destinationId: mongoose.Types.ObjectId,
    status: number,
  ) => {
    try {
      const approvePlace = await ApprovePlace.findOne({ destinationId: destinationId });
      approvePlace.status = status
      approvePlace.save();

      const daytimeUpdate = new Date(approvePlace.updatedAt);

      return {
        message: 'Update approved place successfully',
        data: {
          userId: approvePlace.userId,
          destinationId: approvePlace.destinationId,
          stauts: approvePlace.status,
          updatedAt:
            daytimeUpdate.getDate() +
            '-' +
            daytimeUpdate.getMonth() +
            1 +
            '-' +
            daytimeUpdate.getFullYear() +
            ' | ' +
            daytimeUpdate.getHours() +
            ':' +
            daytimeUpdate.getMinutes() +
            ':' +
            daytimeUpdate.getSeconds(),
        },
      };
    } catch (error) {
      return {
        data: [],
        message: 'Comment cannot Update',
      };
    }
  };

  deleteApprovedPlaceById = async (id: mongoose.Types.ObjectId) => {
    try {
      const cmt = await ApprovePlace.deleteOne({ "_id": id });

      return {
        message: 'Comment deleted successfully',
      };
    } catch (error) {
      throw new Error(error.message);
    }
  };

  deleteApprovedPlaceByDestinationId = async (id: mongoose.Types.ObjectId) => {
    try {
      const cmt = await ApprovePlace.deleteOne({ "destinationId": id });

      return {
        message: 'Approve place deleted successfully',
      };
    } catch (error) {
      throw new Error(error.message);
    }
  };
}

export default ApprovedPlaceService;
