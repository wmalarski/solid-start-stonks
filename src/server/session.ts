import { createClient } from "@supabase/supabase-js";
import { json, redirect } from "solid-start/server";
import { createCookieSessionStorage } from "solid-start/session";
import { serverEnv } from "~/env/server";

const supabase = createClient(
  serverEnv.VITE_SUPABASE_URL,
  serverEnv.VITE_SUPABASE_KEY
);

// const sessionSecret = import.meta.env.SESSION_SECRET;

// export const setAuthCookie = (request: Request, response: Response) => {
//   supabase.auth.api.setAuthCookie(request, response);

// }

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

export const getUserId = async (request: Request) => {
  const session = await getUserSession(request);
  const userId = session.get("userId");
  if (!userId || typeof userId !== "string") {
    return null;
  }
  return userId;
};

export const requireUserId = async (
  request: Request,
  redirectTo: string = new URL(request.url).pathname
) => {
  const session = await getUserSession(request);
  const userId = session.get("userId");
  if (!userId || typeof userId !== "string") {
    const searchParams = new URLSearchParams([["redirectTo", redirectTo]]);
    throw redirect(`/login?${searchParams}`);
  }
  return userId;
};

export const logout = async (request: Request) => {
  const session = await storage.getSession(request.headers.get("Cookie"));
  return redirect("/login", {
    headers: {
      "Set-Cookie": await storage.destroySession(session),
    },
  });
};

export const getUser = async (request: Request) => {
  const userId = await getUserId(request);
  if (typeof userId !== "string") {
    return null;
  }

  try {
    // const user = await db.user.findUnique({ where: { id: Number(userId) } });
    return null;
  } catch {
    throw logout(request);
  }
};

export const createUserSession = async (cookieString: string) => {
  const session = await storage.getSession(cookieString);
  const committed = await storage.commitSession(session);
  return json({}, { headers: { "Set-Cookie": committed }, status: 200 });
};
