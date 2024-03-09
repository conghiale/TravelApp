import mongoose from 'mongoose';
import Destination from '../models/destination-model';
import {roleConstant, statusDestinationConstant} from '../utils/constant';
import { uploadFiles } from '../utils/upload';
import { Request, Response } from 'express';
const fs = require('fs');

class DestinationService {
  createDestination = async (
    req: Request,
    res: Response,
    nameVi: string,
    nameEn: string,
    descriptionVi: string,
    descriptionEn: string,
    latitude: number,
    longitude: number,
    types: mongoose.Types.ObjectId[],
    vote: number,
    createdBy: mongoose.Types.ObjectId,
    role: string,
  ) => {
    let status;
    if (role === roleConstant.ADMIN) {
      status = statusDestinationConstant.ACCEPTED;
    } else if (role === roleConstant.USER) {
      status = statusDestinationConstant.WAITING;
    } else {
      return {
        success: false,
        message: 'Invalid role of user',
      };
    }

    const newDest = await Destination.create({
      nameVi,
      nameEn,
      descriptionVi,
      descriptionEn,
      latitude,
      longitude,
      types,
      vote,
      status,
      createdBy,
    });

    const storedDir = `src/resources/avatar/${newDest._id}`;

    if (!fs.existsSync(storedDir)) {
      fs.mkdirSync(storedDir, {recursive: true});
      console.log(`Directory ${storedDir} created.`);
    }

    uploadFiles(storedDir)(req, res, (error: any) => {
      if (error) {
        return {
            success: false,
            message: error.message
        };
      }
    });

    return {
      success: true,
      message: 'Create destination successfully',
    };
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
}

export default DestinationService;
