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

  const onClick = async () => {
    const auth0 = await import("auth0-js");

    const webAuth = new auth0.WebAuth({
      clientID: import.meta.env.PUBLIC_AUTH0_CLIENT_ID,
      domain: import.meta.env.PUBLIC_AUTH0_DOMAIN,
      redirectUri: import.meta.env.PUBLIC_AUTH0_REDIRECT_URL,
      responseType: "code",
    });

    webAuth.authorize({ connection: "google-oauth2" });
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
