import { Component, Show } from "solid-js";
import { Outlet } from "solid-start";
import { useSessionStatus } from "~/utils/supabase";

const Root: Component = () => {
  const status = useSessionStatus();

  return (
    <div>
      <Show when={status() !== "loading"}>
        <Outlet />
      </Show>
    </div>
  );
};

export default Root;
