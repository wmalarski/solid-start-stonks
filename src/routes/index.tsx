import { Component } from "solid-js";
import { Navigate, redirect } from "solid-start";
import { createServerData$ } from "solid-start/server";
import { getUserSafe } from "~/server/session";
import { paths } from "~/utils/paths";

export const routeData = () => {
  return createServerData$(async (_source, { request }) => {
    const user = await getUserSafe(request);
    if (!user) {
      return redirect(paths.login);
    }
    return user;
  });
};

const Index: Component = () => {
  return <Navigate href={paths.invoices()} />;
};

export default Index;
