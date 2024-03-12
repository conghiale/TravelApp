import express from "express"
import DestinationController from "../controllers/destination.controller"
import { authenticationMiddleware } from "../middleware"

const destController = new DestinationController()
const destinationRoutes = express.Router()

// destinationRoutes.use(authenticationMiddleware)
destinationRoutes.route("/get-all").get(destController.createDestination)
destinationRoutes.route("/uploads").post(destController.uploadMulti)
destinationRoutes.route("/create").post(destController.createDestination)
destinationRoutes.route("/edit/:id").put(destController.deleteDestination)
destinationRoutes.route("/delete").delete(destController.deleteDestination)
destinationRoutes.route("/approve-reject").post(destController.approveRejectDestination)

export default destinationRoutes