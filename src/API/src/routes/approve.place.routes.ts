import express from "express"
import ApprovePlaceController from "../controllers/approve.place.controller"
import { authenticationMiddleware } from "../middleware"

const approvePlaceController = new ApprovePlaceController()
const approvePlaceRoutes = express.Router()

approvePlaceRoutes.use(authenticationMiddleware)
approvePlaceRoutes.route("/create").post(approvePlaceController.createApprovePlace)
approvePlaceRoutes.route("/edit/:id").put(approvePlaceController.updateApprovePlace)
approvePlaceRoutes.route("/editUsers/:destinationId").put(approvePlaceController.updateUsersByDestinationId)
approvePlaceRoutes.route("/editStatus/:destinationId").put(approvePlaceController.updateStatusByDestinationId)
approvePlaceRoutes.route("/approves/:destinationId").get(approvePlaceController.getApprovePlaceByDestinationId)
approvePlaceRoutes.route("/approves").get(approvePlaceController.getAllApprovePlace)
approvePlaceRoutes.route("/delete/:approveId").delete(approvePlaceController.deleteApprovePlaceById)
approvePlaceRoutes.route("/deleteByDestinationId/:destinationId").delete(approvePlaceController.deleteApprovedPlaceByDestinationId)

export default approvePlaceRoutes