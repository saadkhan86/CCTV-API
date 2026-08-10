import express from "express"
import helmet from "helmet"
import env from "dotenv"
import { router } from "./router/router.js";
import { connection } from "./config/mongo.config.js";
import cors from "cors"
env.config()
const app = express();


app.use(cors({
    origin: "*",
    credentials: true
}));


app.use(helmet())

app.use(express.urlencoded({ extended: true }))
app.use(express.json({ limit: "10mb" }))

app.use("/api/v1", router)


connection().then(() => {
    app.listen(process.env.PORT, () => {
        console.log(`server is listening on port ${process.env.PORT}`)
    })
})
