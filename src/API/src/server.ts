import express, { Request, Response } from "express"
import tryConnectDB from "./db"
import userRoutes from "./routes/user.routes"

const app = express()
const PORT = 1702

app.get("/ping", (req: Request, res: Response) => {
    res.send("Pong")
})

app.use("/user", userRoutes)

tryConnectDB().then(() => {
    console.log("- Connect DB successfully")
    app.listen(PORT, () => {
        console.log(`Server running at http://localhost:${PORT}`)
    })
}).catch((error) => {
    console.log("- Connect DB failed:\n", error)
})
