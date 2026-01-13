import express from "express"
import cors from "cors"
import { ENV } from "./config/env"
import { clerkMiddleware } from '@clerk/express'

import userRoutes from "./routes/userRoutes"
import productRoutes from "./routes/productRoutes"
import commentRoutes from "./routes/commentRoutes"

const app = express()


app.use(cors({ origin: ENV.FRONTEND_URL, credentials: true })) // Cross origin resorce sharing. credentials: true allows frontend to send cookies to the backend
app.use(clerkMiddleware()) // Auth obj will be attached to he req
app.use(express.json()) // Parses JSON request bodies
app.use(express.urlencoded({ extended: true })) // Parses from data (like HTML forms)


app.get("/", (req, res) => {
  res.json({
    message: "PERN-STORE API - Powered by PostgresSQL, Drizzle ORM & Clerk Auth",
    endpoints: {
      users: "/api/users",
      products: "/api/products",
      comments: "/api/comments"
    }
  })
})



app.use("/api/users", userRoutes)
app.use("/api/products", productRoutes)
app.use("/api/comments", commentRoutes)


app.listen(ENV.PORT, () => console.log("Server is running on PORT:", ENV.PORT))
