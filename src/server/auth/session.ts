import {
  ServerError,
  createCookieSessionStorage,
  type FetchEvent,
} from "solid-start";
import {
  coerce,
  number,
  object,
  safeParseAsync,
  string,
  type Input,
} from "valibot";
import { serverEnv } from "../env";

const accessTokenKey = "access_token";
const idTokenKey = "id_token";
const scopeKey = "scope";
const expiresInKey = "expires_in";
const tokenTypeKey = "token_type";

const sessionSchema = () => {
  return object({
    [accessTokenKey]: string(),
    [expiresInKey]: coerce(number(), Number),
    [idTokenKey]: string(),
    [scopeKey]: string(),
    [tokenTypeKey]: string(),
  });
};

export type Session = Input<ReturnType<typeof sessionSchema>>;

const createStorage = async (event: FetchEvent) => {
  const env = await serverEnv(event);

  return createCookieSessionStorage({
    cookie: {
      httpOnly: true,
      maxAge: 60 * 60 * 24 * 30, // 30 days
      name: "session",
      path: "/",
      sameSite: "lax",
      secrets: [env.sessionSecret],
      secure: true,
    },
  });
};

const SESSION_COOKIE_KEY = "__session";

const getSessionFromCookie = async (
  event: FetchEvent,
): Promise<Session | null> => {
  const storage = await createStorage(event);

  const cookie = await storage.getSession(event.request.headers.get("Cookie"));

  const parsed = await safeParseAsync(sessionSchema(), {
    [accessTokenKey]: cookie.get(accessTokenKey),
    [expiresInKey]: cookie.get(expiresInKey),
    [idTokenKey]: cookie.get(idTokenKey),
    [scopeKey]: cookie.get(scopeKey),
    [tokenTypeKey]: cookie.get(tokenTypeKey),
  });

  if (parsed.success) {
    return parsed.output;
  }

  return null;
};

export const getSession = (event: FetchEvent): Promise<Session | null> => {
  const cached = event.locals[SESSION_COOKIE_KEY];
  if (cached) {
    return cached as Promise<Session | null>;
  }

  const sessionPromise = getSessionFromCookie(event);
  event.locals[SESSION_COOKIE_KEY] = sessionPromise;

  return sessionPromise;
};

export const getSessionOrThrow = async (
  event: FetchEvent,
): Promise<Session> => {
  const session = await getSession(event);

  if (!session) {
    throw new ServerError("Unauthorized", { status: 401 });
  }

  return session;
};

type SetSessionCookieArgs = {
  event: FetchEvent;
  session: Session;
};

export const commitSessionCookie = async ({
  event,
  session,
}: SetSessionCookieArgs) => {
  const storage = await createStorage(event);

  const cookie = await storage.getSession(event.request.headers.get("Cookie"));

  cookie.set(accessTokenKey, session.access_token);
  cookie.set(idTokenKey, session.id_token);
  cookie.set(scopeKey, session.scope);
  cookie.set(expiresInKey, session.expires_in);
  cookie.set(tokenTypeKey, session.token_type);

  return storage.commitSession(cookie);
};

export const destroySessionCookie = async (event: FetchEvent) => {
  const storage = await createStorage(event);

  const cookie = await storage.getSession(event.request.headers.get("Cookie"));

  return storage.destroySession(cookie);
};
