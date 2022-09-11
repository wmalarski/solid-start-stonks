import { JSX, Show } from "solid-js";
import { Navigate, Outlet } from "solid-start";
import { Sidebar } from "~/modules/Sidebar/Sidebar";
import { paths } from "~/utils/paths";
import { useSessionStatus } from "~/utils/supabase";

const Home = (): JSX.Element => {
  const status = useSessionStatus();

  return (
    <Show when={status() !== "loading"}>
      <Show
        when={status() !== "anon"}
        fallback={<Navigate href={paths.login} />}
      >
        <main class="text-center mx-auto text-gray-700 p-4">
          <Sidebar />
          <Outlet />
        </main>
      </Show>
    </Show>
  );
};

export default Home;
