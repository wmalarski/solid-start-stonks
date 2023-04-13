/* eslint-disable no-console */
import { connect } from "@planetscale/database";
import * as dotenv from "dotenv";
import { drizzle } from "drizzle-orm/planetscale-serverless";
import { migrate } from "drizzle-orm/planetscale-serverless/migrator";

dotenv.config();

const runMigrations = async () => {
  const connection = connect({
    host: process.env.DB_HOST,
    password: process.env.DB_PASSWORD,
    username: process.env.DB_USERNAME,
  });

  const db = drizzle(connection);

  const result = await migrate(db, { migrationsFolder: "./migrations" });

  console.log({ result });
};

runMigrations()
  .then(() => {
    console.log("Migrations ran successfully");
    return process.exit(0);
  })
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
