import { useI18n } from "@solid-primitives/i18n";
import { Component } from "solid-js";
import { A } from "solid-start";
import { createServerAction$, redirect } from "solid-start/server";
import { getUserDestroyCookie } from "~/server/session";
import { paths } from "~/utils/paths";

export const Sidebar: Component = () => {
  const [t] = useI18n();

  const [, { Form }] = createServerAction$(
    async (_form: FormData, { request }) => {
      const destroyed = await getUserDestroyCookie(request);
      return redirect(paths.login, { headers: { "Set-Cookie": destroyed } });
    }
  );

  return (
    <div
      data-theme="black"
      class="flex min-h-screen flex-col justify-between py-4 print:invisible print:hidden"
    >
      <ul class="menu w-56 p-2 ">
        <li>
          <A class="text-sm" activeClass="active" href={paths.index}>
            {t("sidebar.home")}
          </A>
        </li>
      </ul>
      <ul class="menu w-56 p-2 ">
        <li>
          <Form>
            <button type="submit" class="text-sm">
              {t("sidebar.logout")}
            </button>
          </Form>
        </li>
      </ul>
    </div>
  );
};
