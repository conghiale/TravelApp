import mongoose from 'mongoose';

const destinationSchema = new mongoose.Schema(
  {
    nameVi: {
      type: String,
      required: true,
    },
    nameEn: {
      type: String,
      required: true,
    },
    descriptionVi: {
      type: String,
      required: true,
    },
    descriptionEn: {
      type: String,
      required: true,
    },
    latitude: {
      type: Number,
      required: true,
    },
    longitude: {
      type: Number,
      required: true,
    },
    types: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: 'DestinationType',
    },
    vote: {
      type: Number,
      required: true,
    },
    status: {
      type: Number,
      require: true,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      require: true,
    },
  },
  {
    timestamps: true,
  },
)

const Destination = mongoose.model('Destination', destinationSchema)
export default Destination