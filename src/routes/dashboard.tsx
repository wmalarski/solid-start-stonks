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
        fallback={<Navigate href={paths.invoices()} />}
      >
        <main class="flex min-h-screen w-full flex-row">
          <Sidebar />
          <div class="max-h-screen w-full overflow-scroll">
            <Outlet />
          </div>
        </main>
      </Show>
    </Show>
  );
};

export default Dashboard;
