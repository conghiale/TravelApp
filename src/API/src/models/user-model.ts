import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true
    },
    lastName: {
      type: String,
      required: true
    },
    email: {
      type: String,
      unique: true,
      required: true
    },
    password: {
      type: String,
      required: true
    },
    role: {
      type: String,
      default: 'USER',
      required: true
    },
    language: {
      type: String,
      required: true
    },
    lock: {
      type: Boolean,
      default: false,
      require: true
    },
    avatar: {
      type: String,
      require: true,
    },
    viewedPlaces: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: 'Destination',
      require: true,
    }
  },
  {
    timestamps: true,
  },
)

const User = mongoose.model('User', userSchema)
export default User