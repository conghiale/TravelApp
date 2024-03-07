import mongoose from 'mongoose';

const destinationImageSchema = new mongoose.Schema(
  {
    destinationId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Destination',
      required: true,
    },
    path: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  },
)

const DestinationImage = mongoose.model('DestinationImage', destinationImageSchema)
export default DestinationImage