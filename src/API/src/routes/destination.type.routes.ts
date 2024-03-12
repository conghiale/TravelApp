import express from 'express';
import DestinationTypeController from '../controllers/destination.type.controller';
import {authenticationMiddleware} from '../middleware';

const destTypeController = new DestinationTypeController();
const destinationTypeRoutes = express.Router();

// destinationTypeRoutes.use(authenticationMiddleware)
destinationTypeRoutes.route('/create').post(destTypeController.createDestinationType);
destinationTypeRoutes.route('/get-all').get(destTypeController.getAllDestinationType);
destinationTypeRoutes.route('/edit/:id').put(destTypeController.updateDestinationTypeById);
destinationTypeRoutes.route('/delete/:id').delete(destTypeController.deleteDestinationTypeById);

export default destinationTypeRoutes;
