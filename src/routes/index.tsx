import { Component, Show } from "solid-js";
import { Navigate } from "solid-start";
import { paths } from "~/utils/paths";
import { useSessionStatus } from "~/utils/supabase";

const Index: Component = () => {
  const status = useSessionStatus();

  return (
    <Show when={status() !== "loading"}>
      <Show
        when={status() === "anon"}
        fallback={<Navigate href={paths.dashboard} />}
      >
        <Navigate href={paths.login} />
      </Show>
    </Show>
  );
};

export default Index;
