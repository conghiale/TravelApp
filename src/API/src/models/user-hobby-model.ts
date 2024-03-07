import mongoose from 'mongoose';

const userHobbySchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    hobbyVi: {
      type: String,
      required: true,
    },
    hobbyEn: {
      type: String,
      required: true,
    },
    selected: {
      type: Boolean,
      required: true,
    },
  },
  {
    timestamps: true,
  },
)

const UserHobby = mongoose.model('UserHobby', userHobbySchema)
export default UserHobby