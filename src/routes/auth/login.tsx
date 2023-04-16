import { signIn } from "@auth/solid-start/client";
import { useI18n } from "@solid-primitives/i18n";
import { Component } from "solid-js";
import { redirect } from "solid-start";
import { createServerData$ } from "solid-start/server";
import { Button } from "~/components/Button";
import { getSession } from "~/server/auth";
import { paths } from "~/utils/paths";

export const routeData = () => {
  return createServerData$(async (_source, { request }) => {
    const session = await getSession(request);

    if (session) {
      return redirect(paths.invoices());
    }
  });
};

const Login: Component = () => {
  const [t] = useI18n();

  const onClick = () => {
    signIn("google");
  };

  return (
    <div class="card bg-base-300">
      <div class="card-body">
        <h3 class="card-title">{t("login.header")}</h3>
        <div class="pb-2">{t("login.subheader")}</div>
        <div class="card-actions relative pt-3">
          <Button color="primary" class="w-full" onClick={onClick}>
            {t("login.button")}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Login;
