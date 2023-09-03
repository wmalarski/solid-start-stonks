import type { FetchEvent } from "solid-start";
import { buildSearchParams } from "~/utils/searchParams";
import { serverEnv } from "../env";
import type { Session } from "./session";

export type User = {
  sub: string;
  given_name: string;
  family_name: string;
  nickname: string;
  name: string;
  picture: string;
  locale: string;
  updated_at: string;
  email: string;
  email_verified: boolean;
};

type AuthFetchArgs = {
  event: FetchEvent;
  init?: RequestInit;
  path: string;
  query?: Record<string, unknown>;
  session?: Session;
};

export const authFetch = (args: AuthFetchArgs) => {
  const config = serverEnv(args.event);

  const search = buildSearchParams(args.query);

  const url = `https://${config.domain}${args.path}?${search}`;

  const init = args.session
    ? {
        ...args.init,
        headers: {
          Authorization: `${args.session.token_type} ${args.session.access_token}`,
          ...args.init?.headers,
        },
      }
    : args.init;

  return fetch(url, init);
};

export const authFetchJson = async <T>(args: AuthFetchArgs): Promise<T> => {
  const response = await authFetch(args);
  return await response.json();
};

type ExchangeAuthTokenArgs = {
  code: string;
  event: FetchEvent;
};

export const exchangeAuthToken = (args: ExchangeAuthTokenArgs) => {
  const env = serverEnv(args.event);

  const body = new URLSearchParams({
    client_id: env.clientID,
    client_secret: env.clientSecret,
    code: args.code,
    grant_type: "authorization_code",
    redirect_uri: env.redirectUri,
  });

  return authFetchJson<Session>({
    event: args.event,
    init: {
      body,
      headers: { "content-type": "application/x-www-form-urlencoded" },
      method: "POST",
    },
    path: "/oauth/token",
  });
};

type GetAuthUserInfoArgs = {
  event: FetchEvent;
  session: Session;
};

export const getAuthUserInfo = (args: GetAuthUserInfoArgs) => {
  return authFetchJson<User>({
    event: args.event,
    path: "/userinfo",
    session: args.session,
  });
};
