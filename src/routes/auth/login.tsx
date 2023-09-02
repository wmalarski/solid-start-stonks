import { signIn } from "@auth/solid-start/client";
import { useI18n } from "@solid-primitives/i18n";
import type { Component } from "solid-js";
import { redirect } from "solid-start";
import { createServerData$ } from "solid-start/server";
import { Button } from "~/components/Button";
import { Card, CardActions, CardBody, CardTitle } from "~/components/Card";
import { getSession } from "~/server/auth/session";
import { paths } from "~/utils/paths";

export const routeData = () => {
  return createServerData$(async (_source, event) => {
    const session = await getSession(event);

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
    <Card class="bg-base-300">
      <CardBody component="div">
        <CardTitle component="h3">{t("login.header")}</CardTitle>
        <div class="pb-2">{t("login.subheader")}</div>
        <CardActions class="relative pt-3">
          <Button color="primary" class="w-full" onClick={onClick}>
            {t("login.button")}
          </Button>
        </CardActions>
      </CardBody>
    </Card>
  );
};

export default Login;
