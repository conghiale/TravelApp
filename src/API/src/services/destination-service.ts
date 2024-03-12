import mongoose from 'mongoose';
import Destination from '../models/destination-model';
import {roleConstant, statusDestinationConstant} from '../utils/constant';

class DestinationService {
  createDestination = async (
    nameVi: string,
    nameEn: string,
    descriptionVi: string,
    descriptionEn: string,
    latitude: number,
    longitude: number,
    types: mongoose.Types.ObjectId[],
    status: string,
    createdBy: mongoose.Types.ObjectId,
    role: string,
  ) => {
    return await Destination.create({
      nameVi,
      nameEn,
      descriptionVi,
      descriptionEn,
      latitude,
      longitude,
      types,
      status,
      createdBy,
    });
  };

  updateDestinationById = async (
    id: mongoose.Types.ObjectId,
    nameVi: string,
    nameEn: string,
    descriptionVi: string,
    descriptionEn: string,
    latitude: number,
    longitude: number,
    types: mongoose.Types.ObjectId[],
    vote: number,
    status: number,
  ) => {
    const dest = await Destination.findById(id);
    if (nameVi) dest.nameVi = nameVi;
    if (nameEn) dest.nameEn = nameEn;
    if (descriptionVi) dest.descriptionVi = descriptionVi;
    if (descriptionEn) dest.descriptionEn = descriptionEn;
    if (latitude) dest.latitude = latitude;
    if (longitude) dest.longitude = longitude;
    if (types) dest.types = types;
    if (vote) dest.vote = vote;
    if (status) dest.status = status;
    dest.save();
    return {
      success: true,
      message: 'Update destination sucessfully',
    };
  };

  deleteDestinationById = async (id: mongoose.Types.ObjectId) => {
    await Destination.findByIdAndDelete({id})
    return {
        success: true,
        message: 'Delete destination successfully'
    }
  };

  approveRejectDestination = async (
    id: mongoose.Types.ObjectId,
    accepted: boolean,
  ) => {
    const dest = await Destination.findById(id);
    if (accepted) dest.status = statusDestinationConstant.ACCEPTED;
    else dest.status = statusDestinationConstant.REJECTED;
  };

  getTopPlaces = async () => {
    return await Destination.find({}).sort({vote: -1}).limit(10);
  }

  
}

export default DestinationService;
