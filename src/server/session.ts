import {
  createClient,
  Session as SupabaseSession,
  User,
} from "@supabase/supabase-js";
import {
  createServerAction$,
  createServerData$,
  json,
  redirect,
  ServerError,
} from "solid-start/server";
import { createCookieSessionStorage } from "solid-start/session";
import { serverEnv } from "~/env/server";
import { AppendArgument } from "~/utils/types";

const supabase = createClient(
  serverEnv.VITE_SUPABASE_URL,
  serverEnv.VITE_SUPABASE_KEY
);

const storage = createCookieSessionStorage({
  cookie: {
    httpOnly: true,
    maxAge: 60 * 60 * 24 * 30,
    name: "RJ_session",
    path: "/",
    sameSite: "lax",
    secrets: ["hello"],
    secure: true,
  },
});

export const getUserSession = (request: Request) => {
  return storage.getSession(request.headers.get("Cookie"));
};

export const getUser = async (request: Request) => {
  const session = await getUserSession(request);
  const accessToken = session.get("access_token");
  if (!accessToken) {
    return null;
  }
  const user = await supabase.auth.getUser(accessToken);
  return user;
};

const destroyUserSession = async (request: Request) => {
  const session = await getUserSession(request);
  const destroyed = await storage.destroySession(session);
  return redirect("/login", { headers: { "Set-Cookie": destroyed } });
};

const createUserSession = async (supabaseSession?: SupabaseSession) => {
  const session = await storage.getSession();
  session.set("access_token", supabaseSession?.access_token);
  session.set("refresh_token", supabaseSession?.refresh_token);
  session.set("expires_at", supabaseSession?.expires_at);
  session.set("expires_in", supabaseSession?.expires_in);
  const committed = await storage.commitSession(session);
  return json({}, { headers: { "Set-Cookie": committed }, status: 200 });
};

export const updateUserSession = async (request: Request) => {
  const supabaseSession = await request.json();
  if (!supabaseSession) {
    return destroyUserSession(request);
  }
  return createUserSession(supabaseSession);
};

type RouteDataFetcher<T, S> = Parameters<typeof createServerData$<T, S>>[0];
type RouteUserDataFetcher<T, S> = AppendArgument<RouteDataFetcher<T, S>, User>;

export const withUserData = <T, S>(
  fetcher: RouteUserDataFetcher<T, S>
): RouteDataFetcher<T, S> => {
  return async (source, event) => {
    const result = await getUser(event.request);
    if (!result?.data.user) {
      throw new ServerError("UNAUTHORIZED");
    }
    return fetcher(source, event, result.data.user);
  };
};

type RouteActionFetcher<T, S> = Parameters<typeof createServerAction$<T, S>>[0];
type RouteUserActionFetcher<T, S> = AppendArgument<
  RouteActionFetcher<T, S>,
  User
>;

export const withUserAction = <T, S>(
  fetcher: RouteUserActionFetcher<T, S>
): RouteActionFetcher<T, S> => {
  return async (source, event) => {
    const result = await getUser(event.request);
    if (!result?.data.user) {
      throw new ServerError("UNAUTHORIZED");
    }
    return fetcher(source, event, result.data.user);
  };
};
