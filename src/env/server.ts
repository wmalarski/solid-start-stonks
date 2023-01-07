import { z } from "zod";

const schema = z.object({
  // SESSION_SECRET: z.string(),
  GOOGLE_ID: z.string(),
  GOOGLE_SECRET: z.string(),
  VITE_SUPABASE_KEY: z.string(),
  VITE_SUPABASE_URL: z.string(),
});

export const serverEnv = schema.parse({
  ...import.meta.env,
  ...process.env,
});
