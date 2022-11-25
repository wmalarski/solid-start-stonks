import { Component, Show } from "solid-js";
import { createRouteData, Navigate, redirect, useRouteData } from "solid-start";
import { getUser } from "~/server/session";
import { paths } from "~/utils/paths";
import { useSessionStatus } from "~/utils/supabase";

export const routeData = () => {
  return createRouteData(async (_source, { request }) => {
    const user = await getUser(request);
    if (!user) {
      return redirect(paths.login);
    }
    return user;
  });
};

const Index: Component = () => {
  const user = useRouteData<typeof routeData>();

  const status = useSessionStatus();

  return (
    <>
      <Show when={user()}>
        <pre>{JSON.stringify(user(), null, 2)}</pre>
      </Show>
      <Show when={status() !== "loading"} fallback={<span>Fallback</span>}>
        <Show
          when={status() === "anon"}
          fallback={<Navigate href={paths.invoices()} />}
        >
          <Navigate href={paths.login} />
        </Show>
      </Show>
    </>
  );
};

export default Index;
