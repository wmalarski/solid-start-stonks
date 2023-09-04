import { Client } from "@notionhq/client";
import type {
  CreatePageParameters,
  GetPageParameters,
  QueryDatabaseParameters,
  QueryDatabaseResponse,
  UpdatePageParameters,
} from "@notionhq/client/build/src/api-endpoints";
import type { FetchEvent } from "solid-start";
import { serverEnv } from "./env";

const NOTION_CACHE_KEY = "__notion";

const getNotionClient = async (event: FetchEvent): Promise<Client> => {
  const cached = event.locals[NOTION_CACHE_KEY];

  if (cached) {
    return cached as Client;
  }

  const env = await serverEnv(event);

  const notion = new Client({ auth: env.notionKey });

  event.locals[NOTION_CACHE_KEY] = notion;

  return notion;
};

export type QueryDatabaseResult = QueryDatabaseResponse["results"][0];

export const databaseResponseToProperties = (response: QueryDatabaseResult) => {
  return "properties" in response ? response.properties : null;
};

export type QueryDatabaseProperties = NonNullable<
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
  if (property.type !== "unique_id" || !("number" in property.unique_id)) {
    throw new Error(`parsing-error: ${property.type}`);
  }
  return property.unique_id.number;
};

export type CreateProperties = CreatePageParameters["properties"];

export const plainTextToTitle = (content: string) => {
  return {
    title: [{ text: { content }, type: "text" as const }],
    type: "title" as const,
  };
};

export const plainTextToRichText = (content: string) => {
  return {
    rich_text: [{ text: { content }, type: "text" as const }],
    type: "rich_text" as const,
  };
};

export const plainNumberToNumber = (value: number) => {
  return { number: value, type: "number" as const };
};

export const plainDateToDate = (date: string) => {
  return { date: { start: date }, type: "date" as const };
};

export const getNotionUsers = async (event: FetchEvent) => {
  const notion = await getNotionClient(event);

  return notion.users.list({});
};

type WithFetchEvent<T> = T & {
  event: FetchEvent;
};

type QueryDatabaseArgs = WithFetchEvent<
  Omit<QueryDatabaseParameters, "database_id">
>;

export const queryDatabase = async ({ event, ...args }: QueryDatabaseArgs) => {
  const env = await serverEnv(event);
  const notion = await getNotionClient(event);

  return notion.databases.query({ database_id: env.notionDatabase, ...args });
};

type CreatePageArgs = WithFetchEvent<Omit<CreatePageParameters, "parent">>;

export const createPage = async ({ event, ...args }: CreatePageArgs) => {
  const env = await serverEnv(event);
  const notion = await getNotionClient(event);

  return notion.pages.create({
    parent: { database_id: env.notionDatabase, type: "database_id" },
    ...args,
  });
};

type UpdatePageArgs = WithFetchEvent<UpdatePageParameters>;

export const updatePage = async ({ event, ...args }: UpdatePageArgs) => {
  const notion = await getNotionClient(event);

  return notion.pages.update(args);
};

type GetPageArgs = WithFetchEvent<GetPageParameters>;

export const getPage = async ({ event, ...args }: GetPageArgs) => {
  const notion = await getNotionClient(event);

  return notion.pages.retrieve(args);
};
