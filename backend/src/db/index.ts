import { drizzle } from "drizzle-orm/node-postgres"
import { Pool } from "pg"
import * as schema from "./schema"
import { ENV } from "../config/env"


if (!ENV.DATABASE_URL) {
  throw new Error("DATABASE_URL is not set in enviroment variables") 
}


// Initalize PostgrsSQL connection pool
const pool = new Pool({ connectionString: ENV.DATABASE_URL })


// Log when first connection is made
pool.on("connect", () => {
  console.log("Database connected successfully 🚀")
})


// Log when we have an errror
pool.on("error", (error) => {
  console.log("💥 Database connection error:", error)
})


export const db = drizzle({ client: pool, schema })


// Connection Pool
// A connection pool is a cache of database connections that are kept open and reused.

// Why use it?
// Opening/closing connections is slow. Instead of creating a new connection for each request, we reuse existing ones.
// Databases limit concurrent connections. A pool manages a fixed number of connections and shares them across requests.
