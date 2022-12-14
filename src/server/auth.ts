import Google from "@auth/core/providers/google";
import {
  getSession as getAuthSession,
  type SolidAuthConfig,
} from "@auth/solid-start";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { ServerError } from "solid-start";
import { serverEnv } from "./env";
import { prisma } from "./prisma";

export const authOptions: SolidAuthConfig = {
  adapter: PrismaAdapter(prisma),
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

export const getSession = (request: Request) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const unsafeRequest = request as any;

  if (!unsafeRequest.sessionPromise) {
    unsafeRequest.sessionPromise = getAuthSession(request, authOptions);
  }

  return unsafeRequest.sessionPromise;
};

export const getUser = async (request: Request) => {
  const session = await getSession(request);
  if (!session?.user) {
    throw new ServerError("UNAUTHORIZED");
  }
  return session.user;
};
