import mongoose from 'mongoose';
import Destination from '../models/destination-model';
import {roleConstant, statusDestinationConstant} from '../utils/constant';
import User from '../models/user-model';
import DestinationImage from '../models/destination-image-model';

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

  getDestinationById = async (id: string) => {
    const dest = await Destination.findById(id, {__v: 0});
    if (!dest) {
      return {
        success: false,
        message: 'Destination does not exist',
      };
    }

    return {
      success: true,
      message: 'Get destination by id successfully',
      data: {
        ...dest.toObject(),
        createdBy: (await User.findById(dest.createdBy).lean()).email,
        images: await this.getImagesByDestinationId(dest._id),
      },
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
    reason?: string,
  ) => {
    const dest = await Destination.findById(id, {__v: 0});
    if (nameVi) dest.nameVi = nameVi;
    if (nameEn) dest.nameEn = nameEn;
    if (descriptionVi) dest.descriptionVi = descriptionVi;
    if (descriptionEn) dest.descriptionEn = descriptionEn;
    if (latitude) dest.latitude = latitude;
    if (longitude) dest.longitude = longitude;
    if (types && types.length > 0) dest.types = types;
    if (vote) dest.vote = vote;
    if (status) dest.status = status;
    if (reason) dest.reasonReject = reason;
    dest.save();
    return {
      success: true,
      message: 'Update destination sucessfully',
      data: dest,
    };
  };

  deleteDestinationById = async (id: mongoose.Types.ObjectId) => {
    await Destination.findByIdAndDelete({id}, {__v: 0});
    return {
      success: true,
      message: 'Delete destination successfully',
    };
  };

  approveRejectDestination = async (
    id: mongoose.Types.ObjectId,
    accepted: boolean,
  ) => {
    const dest = await Destination.findById(id, {__v: 0});
    if (accepted) dest.status = statusDestinationConstant.ACCEPTED;
    else dest.status = statusDestinationConstant.REJECTED;
  };

  getTopPlaces = async () => {
    return await Destination.find(
      {status: statusDestinationConstant.ACCEPTED},
      {__v: 0},
    )
      .sort({vote: -1})
      .limit(10);
  };

  deg2rad = (deg: number) => {
    return deg * (Math.PI / 180);
  };

  getDistanceFromLatLonInKm = (
    lat1: number,
    lon1: number,
    lat2: number,
    lon2: number,
  ) => {
    const R = 6371; // Radius of the Earth in km
    const dLat = this.deg2rad(lat2 - lat1);
    const dLon = this.deg2rad(lon2 - lon1);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(this.deg2rad(lat1)) *
        Math.cos(this.deg2rad(lat2)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const d = R * c; // Distance in km
    return d;
  };

  getNearestPlaces = async (userLatitude: number, userLongitude: number) => {
    // Function to calculate distance between two points using Haversine formula
    const placesOnMap = await this.getAllDestinationOnMap();
    if (!placesOnMap || placesOnMap.length === 0) {
      return [];
    }

    const placesWithDistances = placesOnMap.map(place => ({
      ...place,
      distance: this.getDistanceFromLatLonInKm(
        userLatitude,
        userLongitude,
        place.latitude,
        place.longitude,
      ),
    }));
    placesWithDistances.sort((me, dest) => me.distance - dest.distance);
    return placesWithDistances.slice(0, 10);
  };

  getAllDestinationOnMap = async () => {
    const promises = (
      await Destination.find(
        {status: statusDestinationConstant.ACCEPTED},
        {updatedAt: 0, __v: 0},
      )
    ).map(async d => ({
      ...d.toObject(),
      images: await this.getImagesByDestinationId(d._id),
    }));
    return await Promise.all(promises);
  };

  getWaitingDestination = async () => {
    const promises = (
      await Destination.find(
        {status: statusDestinationConstant.WAITING},
        {updatedAt: 0, __v: 0},
      )
    ).map(async d => ({
      ...d.toObject(),
      createdBy: (await User.findById(d.createdBy).lean()).email,
      images: await this.getImagesByDestinationId(d._id),
    }));
    return await Promise.all(promises);
  };

  getAllDestinationByCreatedUser = async (uid: mongoose.Types.ObjectId) => {
    const promises = (await Destination.find({createdBy: uid}, {__v: 0})).map(
      async d => ({
        ...d.toObject(),
        images: await this.getImagesByDestinationId(d._id),
      }),
    );
    return await Promise.all(promises);
  };

  getImagesByDestinationId = async destinationId => {
    const data = await DestinationImage.find(
      {destinationId},
      {createdAt: 0, updatedAt: 0, __v: 0, _id: 0, destinationId: 0},
    );
    return data.map(d => d.path);
  };

  resubmitRequest = async destinationId => {
    return await Destination.findByIdAndUpdate(destinationId, {
      status: statusDestinationConstant.WAITING,
    });
  };

  checkDestinationById = async destinationId => {
    return await Destination.findById(destinationId);
  };
}

export default DestinationService;
