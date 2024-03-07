import mongoose from 'mongoose';

const destinationTypeSchema = new mongoose.Schema(
  {
    typeVi: {
      type: String,
      required: true,
    },
    typeEn: {
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