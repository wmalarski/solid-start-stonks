import { redirect } from "solid-start";
import { createServerAction$ } from "solid-start/server";
import { paths } from "~/utils/paths";
import { destroySessionCookie } from "./session";

export const destroySessionServerAction = () => {
  return createServerAction$(async (_form: FormData, event) => {
    console.log("destroySessionServerAction");

    const cookie = await destroySessionCookie(event);

    console.log({ cookie });

    return redirect(paths.index, { headers: { "Set-Cookie": cookie } });
  });
};
