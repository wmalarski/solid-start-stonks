import "@auth/core/types";

declare module "@auth/core/types" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  // eslint-disable-next-line @typescript-eslint/consistent-type-definitions
  interface Session {
    user?: {
      id: string;
    } & DefaultSession["user"];
  }
}
