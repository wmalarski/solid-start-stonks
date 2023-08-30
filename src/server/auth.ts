import { getSession as getAuthSession } from "@auth/solid-start";
import { ServerError, type FetchEvent } from "solid-start";

const SESSION_CACHE_KEY = "__session";

export const getSession = (
  event: Pick<FetchEvent, "env" | "locals" | "request">,
): ReturnType<typeof getAuthSession> => {
  const cached = event.locals[SESSION_CACHE_KEY];
  if (cached) {
    return cached as ReturnType<typeof getAuthSession>;
  }

  const options = getAuthOptions(event);
  const promise = getAuthSession(event.request, options);

  event.locals[SESSION_CACHE_KEY] = promise;

  return promise;
};

export const getUser = async (
  event: Pick<FetchEvent, "env" | "locals" | "request">,
) => {
  const session = await getSession(event);

  if (!session?.user) {
    throw new ServerError("UNAUTHORIZED");
  }

  return session.user;
};
