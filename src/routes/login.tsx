import { useI18n } from "@solid-primitives/i18n";
import clsx from "clsx";
import { Component, Show } from "solid-js";
import { redirect } from "solid-start";
import { createServerAction$, createServerData$ } from "solid-start/server";
import { getUser, signInWithOtp } from "~/server/session";
import { getBaseUrl } from "~/utils/baseUrl";
import { paths } from "~/utils/paths";

export const routeData = () => {
  return createServerData$(async (_source, { request }) => {
    const user = await getUser(request);
    if (user) {
      return redirect(paths.invoices());
    }
  });
};

const Login: Component = () => {
  const [t] = useI18n();

  const [action, { Form }] = createServerAction$(async (formData: FormData) => {
    const email = formData.get("email") as string;
    const result = await signInWithOtp({
      email,
      redirectTo: `${getBaseUrl()}${paths.callback}`,
    });
    return result;
  });

  return (
    <Form class="card bg-base-300">
      <div class="card-body">
        <h3 class="card-title">{t("magicLink.header")}</h3>
        <div class="pb-2">{t("magicLink.subheader")}</div>
        <div class="w-full">
          <input
            class="input w-full"
            disabled={action.pending}
            id="email"
            name="email"
            placeholder="Email"
            type="email"
          />
          <pre>{JSON.stringify(action.result, null, 2)}</pre>
          <Show when={action.result} keyed>
            <Show
              when={action.result?.error}
              fallback={
                <div class="text-sm text-green-600">
                  {t("magicLink.success")}
                </div>
              }
            >
              <div class="text-sm text-red-400">
                {action.result?.error?.message}
              </div>
            </Show>
          </Show>
        </div>
        <div class="card-actions relative pt-3">
          <button
            class={clsx("btn btn-primary w-full", { loading: action.pending })}
            disabled={action.pending}
            type="submit"
          >
            {t("magicLink.button")}
          </button>
        </div>
      </div>
    </Form>
  );
};

export default Login;
