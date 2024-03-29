import express, { Request, Response } from "express"
import tryConnectDB from "./db"
import userRoutes from "./routes/user.routes"
import path from "path"
import destinationRoutes from "./routes/destination.routes"
import userCommentRoutes from "./routes/user.comment.routes"
import cors from 'cors'
import destinationTypeRoutes from "./routes/destination.type.routes"
import userLoveRoutes from "./routes/user.love.routes"
import approvePlaceRoutes from "./routes/approve.place.routes"

const app = express()
const PORT = 1702

app.use('/resources', express.static(path.join(__dirname, 'resources')));
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cors());

app.get('/reset-password/:email/:code', (req: Request, res: Response) => {
    res.sendFile(path.join(__dirname, 'reset-password.html'));
})

app.use("/user", userRoutes)
app.use("/dest", destinationRoutes)
app.use("/comment", userCommentRoutes)
app.use("/approvePlace", approvePlaceRoutes)
app.use("/dtype", destinationTypeRoutes)
app.use("/love", userLoveRoutes)

tryConnectDB().then(() => {
    console.log("- Connect DB successfully")
    app.listen(PORT, () => {
        console.log(`Server running at http://localhost:${PORT}`)
    })
}).catch((error) => {
    console.log("- Connect DB failed:\n", error)
})
