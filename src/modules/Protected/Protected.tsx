import { Component, Show } from "solid-js";
import { Navigate, Outlet } from "solid-start";
import { paths } from "~/utils/paths";
import { useSessionStatus } from "~/utils/supabase";
import { Sidebar } from "./Sidebar/Sidebar";

const Protected: Component = () => {
  const status = useSessionStatus();

  return (
    <Show when={status() === "auth"} fallback={<Navigate href={paths.login} />}>
      <Sidebar />
      <Outlet />
    </Show>
  );
};

export default Protected;
