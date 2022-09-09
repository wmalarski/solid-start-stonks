import { z } from "zod";

const schema = z.object({
  VITE_SUPABASE_KEY: z.string(),
  VITE_SUPABASE_URL: z.string(),
});

export const clientEnv = schema.parse(import.meta.env);
