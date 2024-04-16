import "dotenv/config"
import Pool from "pg-pool"

export const env = process.env as {
  DATABASE_URL: string,
  PORT:string
}
export const pool = new Pool({
  connectionString: env.DATABASE_URL
})