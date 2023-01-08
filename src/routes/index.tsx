import { Component, Show } from "solid-js";
import { redirect, useRouteData } from "solid-start";
import { createServerData$ } from "solid-start/server";
import { Sidebar } from "~/modules/Sidebar/Sidebar";
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

  return (
    <Show when={data()}>
      <main class="flex min-h-screen w-full flex-row">
        <Sidebar />
        <div class="max-h-screen w-full overflow-scroll" />
      </main>
    </Show>
  );
};

export default Index;
