import { type Session as SupabaseSession } from "@supabase/supabase-js";
import { Component, createEffect, onMount } from "solid-js";
import { createRouteData, redirect } from "solid-start";
import { createServerAction$ } from "solid-start/server";
import { getUser, getUserSessionCookie } from "~/server/session";
import { paths } from "~/utils/paths";

export const routeData = () => {
  return createRouteData(async (_source, { request }) => {
    const user = await getUser(request);
    if (user) {
      return redirect(paths.invoices());
    }
  });
};

const Callback: Component = () => {
  const [action, submit] = createServerAction$(
    async (session: Partial<SupabaseSession>) => {
      const cookie = await getUserSessionCookie(session);
      console.log({ cookie, session });
      return redirect(paths.invoices(), {
        headers: { "Set-Cookie": cookie },
        status: 200,
      });
    }
  );

  onMount(() => {
    const hash = window.location.hash.substring(1);
    if (!hash) {
      return;
    }

    const params = new URLSearchParams(hash);
    const accessToken = params.get("access_token");
    const expiresIn = params.get("expires_in");
    const refreshToken = params.get("refresh_token");

    console.log({ accessToken, expiresIn, refreshToken });

    // TODO: zod
    if (!accessToken || !expiresIn || !refreshToken) {
      return;
    }

    submit({
      access_token: accessToken,
      expires_in: +expiresIn,
      refresh_token: refreshToken,
    });
  });

  createEffect(() => {
    console.log("effect", action.error, action.pending, action.result);
  });

  return <span>Loading</span>;
};

export default Callback;
