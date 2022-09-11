import { Component, Show } from "solid-js";
import { Navigate } from "solid-start";
import { paths } from "~/utils/paths";
import { useSessionStatus } from "~/utils/supabase";
import { SignIn } from "./SignIn/SignIn";

const Public: Component = () => {
  const status = useSessionStatus();

  return (
    <Show when={status() === "anon"} fallback={<Navigate href={paths.index} />}>
      <SignIn />
    </Show>
  );
};

export default Public;
