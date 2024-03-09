import express, { Request, Response } from "express"
import tryConnectDB from "./db"
import userRoutes from "./routes/user.routes"
import path from "path"
import destinationRoutes from "./routes/destination.routes"
import userHobbyRoutes from "./routes/user.hobby.routes"
import userCommentRoutes from "./routes/user.comment.routes"
import cors from 'cors'

const app = express()
const PORT = 1702

app.use('/resources', express.static(path.join(__dirname, 'resources')));
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cors());

app.use("/user", userRoutes)
app.use("/dest", destinationRoutes)
app.use("/hobby", userHobbyRoutes)
app.use("/comment", userCommentRoutes)

tryConnectDB().then(() => {
    console.log("- Connect DB successfully")
    app.listen(PORT, () => {
        console.log(`Server running at http://localhost:${PORT}`)
    })
}).catch((error) => {
    console.log("- Connect DB failed:\n", error)
})
