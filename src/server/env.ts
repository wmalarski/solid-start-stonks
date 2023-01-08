import { z } from "zod";

if (typeof window !== "undefined") {
  throw new Error("Loaded on client");
}

const schema = z.object({
  GOOGLE_ID: z.string(),
  GOOGLE_SECRET: z.string(),
});

export const serverEnv = schema.parse({
  GOOGLE_ID: process.env.GOOGLE_ID,
  GOOGLE_SECRET: process.env.GOOGLE_SECRET,
});
