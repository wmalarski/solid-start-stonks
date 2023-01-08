import { Component, Show } from "solid-js";
import { redirect, useRouteData } from "solid-start";
import { createServerData$ } from "solid-start/server";
import { getSession } from "~/server/auth";
import { paths } from "~/utils/paths";

export const routeData = () => {
  return createServerData$(async (_source, { request }) => {
    const session = await getSession(request);

    if (!session) {
      return redirect(paths.login);
    }
    return redirect(paths.invoices());
  });
};

const Index: Component = () => {
  const data = useRouteData<typeof routeData>();

  return <Show when={data()}>Loading</Show>;
};

export default Index;
