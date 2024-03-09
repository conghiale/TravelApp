import express from "express"
import DestinationController from "../controllers/destination.controller"
import { authenticationMiddleware } from "../middleware"

const destController = new DestinationController()
const destinationRoutes = express.Router()

destinationRoutes.use(authenticationMiddleware)
destinationRoutes.route("/create").post(destController.createDestination)
destinationRoutes.route("/delete").put(destController.deleteDestination)
destinationRoutes.route("/delete").put(destController.deleteDestination)
destinationRoutes.route("/approve-reject").post(destController.approveRejectDestination)

export default destinationRoutes