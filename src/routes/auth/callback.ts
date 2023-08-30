import { z, type RequestHandler } from "@builder.io/qwik-city";
import { createCookieSession } from "~/server/auth";
import { getNotionUsers } from "~/server/notion";
import { exchangeAuthToken, getAuthUserInfo } from "~/server/oauth";
import { paths } from "~/utils/paths";

export const onGet: RequestHandler = async (event) => {
  const schema = z.object({ code: z.string(), state: z.string() });

  const parsed = await schema.parseAsync(
    Object.fromEntries(event.query.entries()),
  );

  const session = await exchangeAuthToken({ ...parsed, event });
  const user = await getAuthUserInfo({ event, session });

  const users = await getNotionUsers(event);

  const hasAccess = users.results.some(
    (notionUser) =>
      notionUser.type === "person" && notionUser.person.email === user.email,
  );

  if (!hasAccess) {
    throw event.redirect(302, paths.home);
  }

  createCookieSession(event, session);

  throw event.redirect(302, paths.invoices);
};
