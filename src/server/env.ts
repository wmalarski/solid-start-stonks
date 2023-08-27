import type { FetchEvent } from "solid-start";
import * as v from "valibot";

if (typeof window !== "undefined") {
  throw new Error("SERVER ON CLIENT!");
}

const getEnvSchema = () => {
  return v.object({
    googleId: v.string(),
    googleSecret: v.string(),
    notionDatabase: v.string(),
    notionKey: v.string(),
  });
};

type ServerEnv = v.Input<ReturnType<typeof getEnvSchema>>;

type ServerEnvArgs = Pick<FetchEvent, "env" | "locals">;

const ENV_CACHE_KEY = "__env";

export const serverEnv = ({ env, locals }: ServerEnvArgs): ServerEnv => {
  const cached = locals[ENV_CACHE_KEY];
  if (cached) {
    return cached as ServerEnv;
  }

  const envSchema = getEnvSchema();

  const parsed = v.parse(envSchema, {
    googleId: env.GOOGLE_ID,
    googleSecret: env.GOOGLE_SECRET,
    notionDatabase: env.NOTION_DATABASE,
    notionKey: env.NOTION_KEY,
  });

  locals[ENV_CACHE_KEY] = parsed;

  return parsed;
};
