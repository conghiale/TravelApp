import mongoose from 'mongoose';

const validationSchema = new mongoose.Schema(
  {
    email: {
        type: String,
        require: true,
    },
    validate: {
      type: String,
      default: '000000',
    }
  },
  {
    timestamps: true,
  },
)

const Validation = mongoose.model('Validation', validationSchema)
export default Validation