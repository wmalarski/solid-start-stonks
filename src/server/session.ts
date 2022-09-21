import {
  createClient,
  Session as SupabaseSession,
} from "@supabase/supabase-js";
import { json, redirect } from "solid-start/server";
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

export const getUser = async (request: Request) => {
  const session = await getUserSession(request);
  const accessToken = session.get("access_token");
  if (!accessToken) {
    return null;
  }
  const user = await supabase.auth.api.getUser(accessToken);
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
