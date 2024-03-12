import mongoose from 'mongoose';

const destinationTypeSchema = new mongoose.Schema(
  {
    labelVi: {
      type: String,
      required: true,
    },
    labelEn: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  },
)

const DestinationType = mongoose.model('DestinationType', destinationTypeSchema)
export default DestinationType