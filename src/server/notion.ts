import { Client } from "@notionhq/client";
import type { QueryDatabaseParameters } from "@notionhq/client/build/src/api-endpoints";
import type { FetchEvent } from "solid-start";
import { serverEnv } from "./env";

const NOTION_CACHE_KEY = "__notion";

const getNotionClient = (event: FetchEvent): Client => {
  const cached = event.locals[NOTION_CACHE_KEY];

  if (cached) {
    return cached as Client;
  }

  const env = serverEnv(event);

  const notion = new Client({ auth: env.notionKey });

  event.locals[NOTION_CACHE_KEY] = notion;

  return notion;
};

export const getNotionUsers = (event: FetchEvent) => {
  const notion = getNotionClient(event);

  return notion.users.list({});
};

type QueryNotionDatabaseArgs = Omit<QueryDatabaseParameters, "database_id"> & {
  event: FetchEvent;
};

export const queryNotionDatabase = ({
  event,
  ...args
}: QueryNotionDatabaseArgs) => {
  const env = serverEnv(event);
  const notion = getNotionClient(event);

  return notion.databases.query({ database_id: env.notionDatabase, ...args });
};
