import { Component, Show } from "solid-js";
import { Navigate, Outlet } from "solid-start";
import { Sidebar } from "~/modules/Sidebar/Sidebar";
import { paths } from "~/utils/paths";
import { useSessionStatus } from "~/utils/supabase";

const Dashboard: Component = () => {
  const status = useSessionStatus();

  return (
    <Show when={status() !== "loading"}>
      <Show
        when={status() === "auth"}
        fallback={<Navigate href={paths.invoices} />}
      >
        <main class="flex flex-row w-full min-h-screen">
          <Sidebar />
          <Outlet />
        </main>
      </Show>
    </Show>
  );
};

export default Dashboard;
