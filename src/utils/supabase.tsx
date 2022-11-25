import { createClient } from "@supabase/supabase-js";
import { clientEnv } from "~/env/client";

export const supabase = createClient(
  clientEnv.VITE_SUPABASE_URL,
  clientEnv.VITE_SUPABASE_KEY
);
