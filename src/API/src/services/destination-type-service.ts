import mongoose from "mongoose";
import DestinationType from "../models/destination-type-model";

class DestinationTypeService {
  getAllDestinationType = async () => {
    return await DestinationType.find({}, {__v: 0, createdAt: 0, updatedAt: 0});
  };

  createDestinationType = async (labelVi: string, labelEn: string) => {
    return await DestinationType.create({
        labelVi,
        labelEn,
    })
  };

  updateDestinationTypeById = async (id: mongoose.Types.ObjectId, labelVi: string, labelEn: string) => {
    const dType = await DestinationType.findById(id, {__v: 0});
    if (!dType) {
      return {
        success: false,
        message: 'Destination type does not exist',
      };
    }

    if(labelVi && labelVi !== dType.labelVi) dType.labelVi = labelVi;
    if(labelEn && labelEn !== dType.labelEn) dType.labelEn = labelEn;
    dType.save();

    return {
      success: true,
      message: 'Update destination type by id successfully',
      data: dType,
    };
  };

  deleteDestinationTypeById = async (id: mongoose.Types.ObjectId) => {
    await DestinationType.findByIdAndDelete(id, {__v: 0});
  };
}

export default DestinationTypeService;
