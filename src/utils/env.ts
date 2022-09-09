import { z } from "zod";

const schema = z.object({
  SESSION_SECRET: z.string(),
  VITE_SUPABASE_KEY: z.string(),
  VITE_SUPABASE_URL: z.string(),
});

export const env = schema.parse(import.meta.env);
