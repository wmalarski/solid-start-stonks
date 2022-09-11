import { ServerFunctionEvent } from "solid-start/server";
import { updateUserSession } from "~/server/session";

export const post = ({ request }: ServerFunctionEvent) => {
  return updateUserSession(request);
};
