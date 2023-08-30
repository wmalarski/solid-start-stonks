import type { FetchEvent } from "solid-start";
import * as v from "valibot";

if (typeof window !== "undefined") {
  throw new Error("SERVER ON CLIENT!");
}

const getEnvSchema = () => {
  return v.object({
    clientID: v.string(),
    clientSecret: v.string(),
    domain: v.string(),
    nodeEnv: v.string(),
    notionDatabase: v.string(),
    notionKey: v.string(),
    redirectUri: v.string(),
    sessionSecret: v.string(),
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
    clientID: env.CLIENT_ID || process.env.CLIENT_ID,
    clientSecret: env.CLIENT_SECRET || process.env.CLIENT_SECRET,
    domain: env.DOMAIN || process.env.DOMAIN,
    nodeEnv: env.NODE_ENV || process.env.NODE_ENV,
    notionDatabase: env.NOTION_DATABASE || process.env.NOTION_DATABASE,
    notionKey: env.NOTION_KEY || process.env.NOTION_KEY,
    redirectUri: env.REDIRECT_URI || process.env.REDIRECT_URI,
    sessionSecret: env.SESSION_SECRET || process.env.SESSION_SECRET,
  });

  locals[ENV_CACHE_KEY] = parsed;

  return parsed;
};
