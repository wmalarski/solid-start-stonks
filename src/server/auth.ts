import Google from "@auth/core/providers/google";
import {
  getSession as getAuthSession,
  type SolidAuthConfig,
} from "@auth/solid-start";
import { ServerError, type FetchEvent } from "solid-start";
import { serverEnv } from "./env";

export const getAuthOptions = (
  event: Pick<FetchEvent, "env" | "locals">,
): SolidAuthConfig => ({
  callbacks: {
    session({ session, user }) {
      if (session.user) {
        session.user.id = user.id;
      }
      return session;
    },
  },
  debug: false,
  providers: [
    Google({
      clientId: serverEnv(event).googleId,
      clientSecret: serverEnv(event).googleSecret,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    }) as any,
  ],
});

const SESSION_CACHE_KEY = "__session";

export const getSession = (
  event: Pick<FetchEvent, "env" | "locals" | "request">,
): ReturnType<typeof getAuthSession> => {
  const cached = event.locals[SESSION_CACHE_KEY];
  console.log("import", event.env);
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
