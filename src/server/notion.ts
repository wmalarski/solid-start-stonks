import { Client } from "@notionhq/client";
import type {
  QueryDatabaseParameters,
  QueryDatabaseResponse,
} from "@notionhq/client/build/src/api-endpoints";
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

export type QueryDatabaseResult = QueryDatabaseResponse["results"][0];

export const databaseResponseToProperties = (
  response: QueryDatabaseResponse["results"][0],
) => {
  return "properties" in response ? response.properties : null;
};

type QueryDatabaseProperties = NonNullable<
  ReturnType<typeof databaseResponseToProperties>
>;

type QueryDatabaseProperty = QueryDatabaseProperties[0];

export const titleToPlainText = (property: QueryDatabaseProperty) => {
  if (property.type !== "title") {
    throw new Error(`parsing-error: ${property.type}`);
  }
  return property.title.map((entry) => entry.plain_text).join(" ");
};

export const richTextToPlainText = (property: QueryDatabaseProperty) => {
  if (property.type !== "rich_text") {
    throw new Error(`parsing-error: ${property.type}`);
  }
  return property.rich_text.map((entry) => entry.plain_text).join(" ");
};

export const numberToPlainNumber = (property: QueryDatabaseProperty) => {
  if (property.type !== "number" || typeof property.number !== "number") {
    throw new Error(`parsing-error: ${property.type}`);
  }
  return property.number;
};

export const dateToPlainDate = (property: QueryDatabaseProperty) => {
  if (property.type !== "date" || !property.date?.start) {
    throw new Error(`parsing-error: ${property.type}`);
  }
  return property.date.start;
};

export const uniqueIdToPlainText = (property: QueryDatabaseProperty) => {
  if (property.type !== "unique_id" || !property.unique_id.number) {
    throw new Error(`parsing-error: ${property.type}`);
  }
  return property.unique_id.number;
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

type InsertNotionDatabaseArgs = Omit<QueryDatabaseParameters, "database_id"> & {
  event: FetchEvent;
};

export const insertNotionDatabase = ({
  event,
  ...args
}: InsertNotionDatabaseArgs) => {
  const env = serverEnv(event);
  const notion = getNotionClient(event);

  return notion.databases.create({
    parent: { database_id: env.notionDatabase, type: "database_id" },
    properties: {},
    // ...args,
  });
};
