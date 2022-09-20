import { Component, Show } from "solid-js";
import { Navigate } from "solid-start";
import { SignIn } from "~/modules/SignIn/SignIn";
import { paths } from "~/utils/paths";
import { useSessionStatus } from "~/utils/supabase";

const Login: Component = () => {
  const status = useSessionStatus();

  return (
    <Show when={status() !== "loading"}>
      <Show
        when={status() === "anon"}
        fallback={<Navigate href={paths.invoices()} />}
      >
        <SignIn />
      </Show>
    </Show>
  );
};

export default Login;
