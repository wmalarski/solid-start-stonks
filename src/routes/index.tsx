import { getSession } from "@auth/solid-start";
import { Component } from "solid-js";
import { Navigate, redirect } from "solid-start";
import { createServerData$ } from "solid-start/server";
import { authOptions } from "~/server/auth";
import { paths } from "~/utils/paths";

export const routeData = () => {
  return createServerData$(async (_source, { request }) => {
    // const user = await getUserSafe(request);
    const session = await getSession(request, authOptions);
    if (!session) {
      return redirect(paths.login);
    }
    return session;
  });
};

const Index: Component = () => {
  return <Navigate href={paths.invoices()} />;
};

export default Index;
