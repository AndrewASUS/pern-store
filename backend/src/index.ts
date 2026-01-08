import express from "express"
import cors from "cors"
import { ENV } from "./config/env"
import { clerkMiddleware } from '@clerk/express'
import { User } from "./db/schema"


const app = express()

const user:User = {

}


app.use(cors({ origin: ENV.FRONTEND_URL })) // Cross origin resorce sharing
app.use(clerkMiddleware()) // Auth obj will be attached to he req
app.use(express.json) // Parses JSON request bodies
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


app.listen(ENV.PORT, () => console.log("Server is running on PORT:", ENV.PORT))
