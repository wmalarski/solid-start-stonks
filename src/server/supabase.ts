import { createClient } from "@supabase/supabase-js";
import { env } from "~/utils/env";

export const supabase = createClient(
  env.VITE_SUPABASE_URL,
  env.VITE_SUPABASE_KEY
);
