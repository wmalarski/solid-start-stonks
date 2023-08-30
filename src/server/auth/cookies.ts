import type { RequestEventBase } from "@builder.io/qwik-city";
import jwt from "jsonwebtoken";
import { getServerEnv } from "./env";
import type { Session } from "./oauth";

const options = {
  httpOnly: true,
  maxAge: 0,
  name: "__session",
  path: "/",
  sameSite: "lax",
} as const;

const SESSION_COOKIE_KEY = "__session";

export const createCookieSession = (
  event: RequestEventBase,
  session: Session,
) => {
  const env = getServerEnv(event);

  const token = jwt.sign(session, env.sessionSecret, { expiresIn: "7d" });

  event.cookie.set(SESSION_COOKIE_KEY, token, {
    ...options,
    maxAge: 60 * 60 * 24 * 7, // 7 days
    secure: env.nodeEnv === "production",
  });
};

export const deleteCookieSession = (event: RequestEventBase) => {
  event.cookie.delete(SESSION_COOKIE_KEY, options);
};

const getCookieSession = (event: RequestEventBase): Session | null => {
  const token = event.cookie.get(SESSION_COOKIE_KEY)?.value;
  const env = getServerEnv(event);

  if (!token) {
    return null;
  }

  try {
    const session = jwt.verify(token, env.sessionSecret);

    return session as Session;
  } catch (err) {
    deleteCookieSession(event);

    return null;
  }
};

const SESSION_CACHE_KEY = "__session";

export const getRequestCookieSession = (
  event: RequestEventBase,
): Session | null => {
  const value = event.sharedMap.get(SESSION_CACHE_KEY);

  if (value) {
    return value.session;
  }

  const session = getCookieSession(event);

  event.sharedMap.set(SESSION_CACHE_KEY, { session });

  return session;
};

export const clearRequestSession = (event: RequestEventBase) => {
  event.sharedMap.set(SESSION_CACHE_KEY, { session: null });
};
