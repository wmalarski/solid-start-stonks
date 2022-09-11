import { JSX, Show } from "solid-js";
import { Navigate } from "solid-start";
import { SignIn } from "~/modules/SignIn/SignIn";
import { paths } from "~/utils/paths";
import { useSessionStatus } from "~/utils/supabase";

const Login = (): JSX.Element => {
  const status = useSessionStatus();

  return (
    <Show when={status() !== "loading"}>
      <Show
        when={status() !== "auth"}
        fallback={<Navigate href={paths.invoices} />}
      >
        <main>
          <SignIn />
        </main>
      </Show>
    </Show>
  );
};

export default Login;
