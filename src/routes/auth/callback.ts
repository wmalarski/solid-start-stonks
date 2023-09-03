import { redirect, type APIEvent } from "solid-start";
import { object, parseAsync, string } from "valibot";
import { exchangeAuthToken, getAuthUserInfo } from "~/server/auth/oauth";
import { setSessionCookie } from "~/server/auth/session";
import { getNotionUsers } from "~/server/notion";
import { paths } from "~/utils/paths";

export const GET = async (event: APIEvent) => {
  const schema = object({ code: string(), state: string() });

  const search = new URL(event.request.url).searchParams;
  const parsed = await parseAsync(schema, Object.fromEntries(search.entries()));

  const session = await exchangeAuthToken({ ...parsed, event });

  const user = await getAuthUserInfo({ event, session });

  const users = await getNotionUsers(event);

  const hasAccess = users.results.some(
    (notionUser) =>
      notionUser.type === "person" && notionUser.person.email === user.email,
  );

  if (!hasAccess) {
    throw redirect(paths.index, 302);
  }

  const cookie = await setSessionCookie({ event, session });

  return redirect(paths.invoices(), { headers: { "Set-Cookie": cookie } });
};
