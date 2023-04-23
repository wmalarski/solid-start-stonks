import { connect } from "@planetscale/database";
import { drizzle } from "drizzle-orm/planetscale-serverless";

// Create the connection.
const connection = connect({
  host: process.env.DB_HOST,
  password: process.env.DB_PASSWORD,
  username: process.env.DB_USERNAME,
});

export const db = drizzle(connection);
