import mongoose from 'mongoose';

const userLoveSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    destinationId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Destination',
      required: true,
    },
  },
  {
    timestamps: true,
  },
)

const UserLove = mongoose.model('UserLove', userLoveSchema)
export default UserLove