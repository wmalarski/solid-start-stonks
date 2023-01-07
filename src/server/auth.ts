import Google from "@auth/core/providers/google";
import { getSession, type SolidAuthConfig } from "@auth/solid-start";
import { ServerError } from "solid-start";
import { serverEnv } from "~/env/server";

export const authOptions: SolidAuthConfig = {
  callbacks: {
    session({ session, user }) {
      if (session.user) {
        session.user.id = user.id;
      }
      return session;
    },
  },
  debug: false,
  providers: [
    Google({
      clientId: serverEnv.GOOGLE_ID,
      clientSecret: serverEnv.GOOGLE_SECRET,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    }) as any,
  ],
};

export const getUser = async (request: Request) => {
  const session = await getSession(request, authOptions);
  if (!session?.user) {
    throw new ServerError("UNAUTHORIZED");
  }
  return session.user;
};
