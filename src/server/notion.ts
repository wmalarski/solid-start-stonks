import { Client } from "@notionhq/client";
import type {
  AppendBlockChildrenParameters,
  CreateDatabaseParameters,
  DeleteBlockParameters,
  QueryDatabaseParameters,
  QueryDatabaseResponse,
  UpdateBlockParameters,
  UpdateDatabaseParameters,
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

export const databaseResponseToProperties = (
  response: QueryDatabaseResponse["results"][0],
) => {
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

export type CreateProperties = CreateDatabaseParameters["properties"];

type CreateProperty = CreateProperties[0];

export const plainTextToTitle = (text: string): CreateProperty => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return { rich_text: { text } as any, type: "rich_text" };
};

export const plainTextToRichText = (text: string): CreateProperty => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return { rich_text: [{ text: { content: text } }] as any, type: "rich_text" };
};

export const plainNumberToNumber = (value: number): CreateProperty => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return { number: value as any, type: "number" };
};

export const plainDateToDate = (date: string): CreateProperty => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return { date: { start: date } as any, type: "date" };
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

type CreateNotionDatabaseArgs = Omit<CreateDatabaseParameters, "parent"> & {
  event: FetchEvent;
};

export const createNotionDatabase = async ({
  event,
  ...args
}: CreateNotionDatabaseArgs) => {
  const env = await serverEnv(event);
  const notion = await getNotionClient(event);

  return notion.databases.create({
    parent: { database_id: env.notionDatabase, type: "database_id" },
    ...args,
  });
};

type UpdateNotionDatabaseArgs = Omit<
  UpdateDatabaseParameters,
  "database_id"
> & {
  event: FetchEvent;
};

export const updateNotionDatabase = async ({
  event,
  ...args
}: UpdateNotionDatabaseArgs) => {
  const env = await serverEnv(event);
  const notion = await getNotionClient(event);

  return notion.databases.update({
    database_id: env.notionDatabase,
    ...args,
  });
};

type AppendBlockArgs = WithFetchEvent<
  Omit<AppendBlockChildrenParameters, "block_id">
>;

export const appendBlock = async ({ event, ...args }: AppendBlockArgs) => {
  const env = await serverEnv(event);
  const notion = await getNotionClient(event);

  console.log(args);

  return notion.blocks.children.append({
    block_id: env.notionDatabase,
    children: [],
    // parent: { database_id: env.notionDatabase, type: "database_id" },
    // ...args,
  });
};

type DeleteBlockArgs = WithFetchEvent<DeleteBlockParameters>;

export const deleteBlock = async ({ event, ...args }: DeleteBlockArgs) => {
  const notion = await getNotionClient(event);

  console.log(args);

  return notion.blocks.delete({ ...args });
};

type UpdateBlockArgs = WithFetchEvent<UpdateBlockParameters>;

export const updateBlock = async ({ event, ...args }: UpdateBlockArgs) => {
  const notion = await getNotionClient(event);

  console.log(args);

  return notion.blocks.update({ ...args });
};
