import "dotenv/config";

const config = {
  connectionString: process.env.DB_URL,
  out: "./migrations",
  schema: "./src/db/schema.ts",
};

export default config;
