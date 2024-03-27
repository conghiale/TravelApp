import mongoose from 'mongoose';

const approvedPlacesSchema = new mongoose.Schema(
  {
    userId: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: 'User',
      required: true,
    },
    destinationId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Destination',
      required: true,
    },
    status: {
      type: Number, // 0: rejected, 1: accepted
      required: true,
    },
  },
  {
    timestamps: true,
  },
)

const ApprovedPlace = mongoose.model('ApprovedPlace', approvedPlacesSchema)
export default ApprovedPlace