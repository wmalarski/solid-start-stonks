import { SolidAuth } from "@auth/solid-start";
import type { FetchEvent } from "solid-start";
import { getAuthOptions } from "~/server/auth";

export const GET = (event: FetchEvent) => {
  const options = getAuthOptions(event);
  return SolidAuth(options).GET(event);
};

export const POST = (event: FetchEvent) => {
  const options = getAuthOptions(event);
  return SolidAuth(options).POST(event);
};
