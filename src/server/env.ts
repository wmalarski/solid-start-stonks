import type { FetchEvent } from "solid-start";
import { object, parseAsync, string, type Input } from "valibot";

if (typeof window !== "undefined") {
  throw new Error("SERVER ON CLIENT!");
}

const getEnvSchema = () => {
  return object({
    clientID: string(),
    clientSecret: string(),
    domain: string(),
    nodeEnv: string(),
    notionDatabase: string(),
    notionKey: string(),
    redirectUri: string(),
    sessionSecret: string(),
  });
};

type ServerEnv = Input<ReturnType<typeof getEnvSchema>>;

type ServerEnvArgs = Pick<FetchEvent, "env" | "locals">;

const ENV_CACHE_KEY = "__env";

export const serverEnv = ({
  env,
  locals,
}: ServerEnvArgs): Promise<ServerEnv> => {
  const cached = locals[ENV_CACHE_KEY];

  if (cached) {
    return cached as Promise<ServerEnv>;
  }

  const envSchema = getEnvSchema();

  const parsed = parseAsync(envSchema, {
    clientID: env.CLIENT_ID || process.env.VITE_AUTH0_CLIENT_ID,
    clientSecret: env.CLIENT_SECRET || process.env.AUTH0_CLIENT_SECRET,
    domain: env.DOMAIN || process.env.VITE_AUTH0_DOMAIN,
    nodeEnv: env.NODE_ENV || process.env.NODE_ENV,
    notionDatabase: env.NOTION_DATABASE || process.env.NOTION_DATABASE,
    notionKey: env.NOTION_KEY || process.env.NOTION_KEY,
    redirectUri: env.REDIRECT_URI || process.env.VITE_AUTH0_REDIRECT_URL,
    sessionSecret: env.SESSION_SECRET || process.env.SESSION_SECRET,
  });

  locals[ENV_CACHE_KEY] = parsed;

  return parsed;
};
