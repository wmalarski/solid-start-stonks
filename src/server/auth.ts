import Google from "@auth/core/providers/google";
import { type SolidAuthConfig } from "@auth/solid-start";
import { serverEnv } from "~/env/server";

export const authOptions: SolidAuthConfig = {
  debug: false,
  providers: [
    Google({
      clientId: serverEnv.GOOGLE_ID,
      clientSecret: serverEnv.GOOGLE_SECRET,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    }) as any,
  ],
};
