import { Component } from "solid-js";
import { createRouteData, redirect } from "solid-start";
import { SignIn } from "~/modules/SignIn/SignIn";
import { getUser } from "~/server/session";
import { paths } from "~/utils/paths";

export const routeData = () => {
  return createRouteData(async (_source, { request }) => {
    const user = await getUser(request);
    if (user) {
      return redirect(paths.invoices());
    }
  });
};

const Login: Component = () => {
  return <SignIn />;
};

export default Login;
