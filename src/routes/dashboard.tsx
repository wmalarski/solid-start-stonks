import type { Component } from "solid-js";
import { Outlet, useRouteData } from "solid-start";
import { createServerData$, redirect } from "solid-start/server";
import { Sidebar } from "~/modules/common/Sidebar/Sidebar";
import { getSession } from "~/server/auth/session";
import { paths } from "~/utils/paths";

export const routeData = () => {
  return createServerData$(async (_source, event) => {
    const session = await getSession(event);

    if (!session) {
      return redirect(paths.login);
    }

    return null;
  });
};

const Dashboard: Component = () => {
  useRouteData<typeof routeData>();

  return (
    <main class="flex min-h-screen w-full flex-row">
      <Sidebar />
      <div class="max-h-screen w-full overflow-scroll">
        <Outlet />
      </div>
    </main>
  );
};

export default Dashboard;
