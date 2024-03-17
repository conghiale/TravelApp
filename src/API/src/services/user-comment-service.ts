import mongoose from 'mongoose';
import UserComment from '../models/user-comment-model';
import User from '../models/user-model';

class UserCommentService {
  getCommentsByDestinationId = async (
    destinationId: mongoose.Types.ObjectId,
  ) => {
    const cmts = await UserComment.find(
      {
        destinationId: destinationId,
        isDeleted: false,
      },
      {__v: 0},
    ).sort({updatedAt: -1});

    const data = await Promise.all(
      cmts.map(async cmt => {
        const daytimeCreated = new Date(cmt.createdAt);
        const daytimeUpdate = new Date(cmt.updatedAt);

        return {
          _id: cmt._id,
          userId: cmt.userId,
          destinationId: cmt.destinationId,
          content: cmt.content,
          star: cmt.star,
          isDeleted: cmt.isDeleted,
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

  createComment = async (
    userId: string,
    destinationId: string,
    content: string,
    star: number,
  ) => {
    try {
      const createComment = await UserComment.create({
        userId,
        destinationId,
        content,
        star,
      });

      const daytimeCreated = new Date(createComment.createdAt);
      const daytimeUpdate = new Date(createComment.updatedAt);

      const data = {
        _id: createComment._id.toString(),
        userId: createComment.userId,
        destinationId: createComment.destinationId,
        content: createComment.content,
        star: createComment.star,
        isDeleted: createComment.isDeleted,
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
        email: (await User.findById(createComment.userId)).email,
        avatar: (await User.findById(createComment.userId)).avatar,
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

  updateComment = async (
    id: mongoose.Types.ObjectId,
    content: string,
    star: number,
  ) => {
    try {
      const comment = await UserComment.findById(id);
      comment.star = star;
      comment.content = content;
      comment.save();

      const daytimeUpdate = new Date(comment.updatedAt);

      return {
        message: 'Update comment successfully',
        data: {
          content: comment.content,
          star: comment.star,
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

  deleteCommentById = async (id: mongoose.Types.ObjectId) => {
    try {
      const cmt = await UserComment.findById(id, {__v: 0});
      cmt.isDeleted = true;
      cmt.save();

      return {
        message: 'Comment deleted successfully',
      };
    } catch (error) {
      throw new Error(error.message);
    }
  };

  calculateAverage = (numbers: number[]) => {
    const sum = numbers.reduce((acc, num) => acc + num, 0);
    return Math.round((sum / numbers.length) * 2) / 2;
  };
}

export default UserCommentService;
