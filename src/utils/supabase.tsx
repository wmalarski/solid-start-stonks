import { createClient, Session } from "@supabase/supabase-js";
import {
  Component,
  createContext,
  createSignal,
  JSX,
  onCleanup,
  useContext,
} from "solid-js";
import { clientEnv } from "~/env/client";

export const supabase = createClient(
  clientEnv.VITE_SUPABASE_URL,
  clientEnv.VITE_SUPABASE_KEY
);

type SessionState =
  | {
      status: "auth";
      session: Session;
    }
  | {
      status: "anon";
    }
  | {
      status: "loading";
    };

type SessionStateAccessor = () => SessionState;

const SessionContext = createContext<SessionStateAccessor>(() => ({
  status: "loading",
}));

type Props = {
  children: JSX.Element;
};

// const action = createServerAction((_, { request }) => {
//   const cookie = request.headers.get("cookie");
//   return createUserSession(cookie);
// });

export const SessionProvider: Component<Props> = (props) => {
  const [session, setSession] = createSignal<SessionState>({
    status: "loading",
  });

  const { data } = supabase.auth.onAuthStateChange((_event, session) => {
    console.log("onAuthStateChange", { _event, session });
    // action
    setSession(session ? { session, status: "auth" } : { status: "anon" });
  });

  onCleanup(() => {
    data.unsubscribe();
  });

  return (
    <SessionContext.Provider value={session}>
      {props.children}
    </SessionContext.Provider>
  );
};

export const useSessionStatus = (): (() => SessionState["status"]) => {
  return () => useContext(SessionContext)().status;
};

export const useSupabaseSession = (): (() => Session) => {
  return () => {
    const context = useContext(SessionContext);
    const state = context();

    if (state.status !== "auth") {
      throw new Error("Session is not defined");
    }

    return state.session;
  };
};
