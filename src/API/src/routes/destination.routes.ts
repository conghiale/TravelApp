import express from 'express';
import DestinationController from '../controllers/destination.controller';
import {authenticationMiddleware} from '../middleware';

const destController = new DestinationController();
const destinationRoutes = express.Router();

destinationRoutes.use(authenticationMiddleware)
destinationRoutes
  .route('/get-all/:role/:uid')
  .get(destController.getAllPlacesByRole);
destinationRoutes
  .route('/nearest/:latitude/:longitude')
  .get(destController.getNearestPlaces);
destinationRoutes.route('/get-all').get(destController.getAllPlacesOnMap);
destinationRoutes.route('/top').get(destController.getTopPlaces);
destinationRoutes.route('/waiting').get(destController.getWaitingDestination);

destinationRoutes.route('/uploads').post(destController.uploadMulti);
destinationRoutes.route('/get/:id').get(destController.getDestinationById);
destinationRoutes.route('/get-images/:id').get(destController.getImagesByDestinationId);
destinationRoutes.route('/create').post(destController.createDestination);
destinationRoutes.route('/edit/:id').put(destController.updateDestination);
destinationRoutes.route('/resubmit').put(destController.resubmitRequest);
destinationRoutes.route('/delete').delete(destController.deleteDestination);
destinationRoutes.route('/approval').post(destController.approvalDestination);

export default destinationRoutes;
