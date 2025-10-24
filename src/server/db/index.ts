import { drizzle } from "drizzle-orm/singlestore"
import { createPool, type Pool } from "mysql2/promise"

import { env } from "~/env"

/**
 * Cache the database connection in development. This avoids creating a new connection on every HMR
 * update.
 */
const globalForDb = globalThis as unknown as {
  conn: Pool | undefined
}

const conn =
  globalForDb.conn ??
  createPool({
    host: String(env.SINGLESTORE_HOST),
    port: Number(env.SINGLESTORE_PORT) || 3306,
    user: String(env.SINGLESTORE_USER),
    password: String(env.SINGLESTORE_PASS),
    database: String(env.SINGLESTORE_DB_NAME),
    ssl: {},
    maxIdle: 0,
  })
if (env.NODE_ENV !== "production") globalForDb.conn = conn
// export const client =
//   globalForDb.client ?? createClient({ url: env.DATABASE_URL })
// if (env.NODE_ENV !== "production") globalForDb.client = client

// export const db = drizzle(client, { schema })
