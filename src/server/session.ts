import {
  createClient,
  Session as SupabaseSession,
  User,
} from "@supabase/supabase-js";
import { createServerData$, ServerError } from "solid-start/server";
import { createCookieSessionStorage } from "solid-start/session";
import { serverEnv } from "~/env/server";

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

export const getUserSafe = async (request: Request) => {
  const session = await getUserSession(request);
  const accessToken = session.get("access_token");

  if (!accessToken) {
    return null;
  }
  const user = await supabase.auth.getUser(accessToken);
  return user;
};

export const getUserSessionCookie = async (
  supabaseSession: Partial<SupabaseSession>
) => {
  const session = await storage.getSession();
  session.set("access_token", supabaseSession?.access_token);
  session.set("refresh_token", supabaseSession?.refresh_token);
  session.set("expires_at", supabaseSession?.expires_at);
  session.set("expires_in", supabaseSession?.expires_in);
  return storage.commitSession(session);
};

export const getUserDestroyCookie = async (request: Request) => {
  const session = await getUserSession(request);
  return storage.destroySession(session);
};

type RouteDataFetcher<T, S> = Parameters<typeof createServerData$<T, S>>;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type RouteDataEvent = Parameters<RouteDataFetcher<any, any>[0]>[1];

export const createServerDataWithUser$ = <T, S = true>(
  fetcher: (
    s: S,
    e: RouteDataEvent & { user: User }
  ) => ReturnType<RouteDataFetcher<T, S>[0]>,
  options: RouteDataFetcher<T, S>[1]
) => {
  return createServerData$<T, S>(async (source, event) => {
    const result = await getUserSafe(event.request);
    if (!result?.data.user) {
      throw new ServerError("UNAUTHORIZED");
    }
    return fetcher(source, { ...event, user: result.data.user });
  }, options);
};

export const getUser = async (request: Request) => {
  const result = await getUserSafe(request);
  if (!result?.data.user) {
    throw new ServerError("UNAUTHORIZED");
  }
  return result.data.user;
};

type SignInWithOtp = {
  email: string;
  redirectTo: string;
};

export const signInWithOtp = async ({ email, redirectTo }: SignInWithOtp) => {
  const result = await supabase.auth.signInWithOtp({
    email,
    options: { emailRedirectTo: redirectTo },
  });
  return result;
};
