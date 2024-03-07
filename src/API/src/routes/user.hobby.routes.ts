import express from "express"
import UserHobbyController from "../controllers/user.hobby.controller"
import { authenticationMiddleware } from "../middleware"

const userHobbyController = new UserHobbyController()
const userHobbyRoutes = express.Router()

userHobbyRoutes.use(authenticationMiddleware)
userHobbyRoutes.route("/create").post(userHobbyController.createHobby)
userHobbyRoutes.route("/update").put(userHobbyController.updateHobby)
userHobbyRoutes.route("/delete/:id").put(userHobbyController.deleteHobbyById)

export default userHobbyRoutes