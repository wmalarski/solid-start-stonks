import type { FetchEvent } from "solid-start";
import { z } from "zod";

if (typeof window !== "undefined") {
  throw new Error("SERVER ON CLIENT!");
}

const getEnvSchema = () => {
  return z.object({
    googleId: z.string(),
    googleSecret: z.string(),
    notionDatabase: z.string(),
    notionKey: z.string(),
  });
};

type ServerEnv = z.infer<ReturnType<typeof getEnvSchema>>;

type ServerEnvArgs = Pick<FetchEvent, "env" | "locals">;

const ENV_CACHE_KEY = "__env";

export const serverEnv = ({ env, locals }: ServerEnvArgs): ServerEnv => {
  const cached = locals[ENV_CACHE_KEY];
  if (cached) {
    return cached as ServerEnv;
  }

  const envSchema = getEnvSchema();

  const parsed = envSchema.parse({
    googleId: env.GOOGLE_ID,
    googleSecret: env.GOOGLE_SECRET,
    notionDatabase: env.NOTION_DATABASE,
    notionKey: env.NOTION_KEY,
  });

  locals[ENV_CACHE_KEY] = parsed;

  return parsed;
};
