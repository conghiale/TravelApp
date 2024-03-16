import express from "express"
import UserCommentController from "../controllers/user.comment.controller"
import { authenticationMiddleware } from "../middleware"

const userCommentController = new UserCommentController()
const userCommentRoutes = express.Router()

userCommentRoutes.use(authenticationMiddleware)
userCommentRoutes.route("/create").post(userCommentController.createComment)
userCommentRoutes.route("/edit/:id").put(userCommentController.updateComment)
userCommentRoutes.route("/comments/:destinationId").get(userCommentController.getCommentsByDestinationId)
userCommentRoutes.route("/delete/:commentId").delete(userCommentController.deleteCommentById)

export default userCommentRoutes