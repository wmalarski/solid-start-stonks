import { createClient, Session } from "@supabase/supabase-js";
import {
  Component,
  createContext,
  createSignal,
  JSX,
  onCleanup,
  useContext,
} from "solid-js";
import { ServerError } from "solid-start/server";
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
  status: "loading" as const,
}));

type Props = {
  children: JSX.Element;
};

const sendSession = async (session: Session) => {
  await fetch("/api/auth", {
    body: JSON.stringify(session),
    method: "POST",
  });
};

export const SessionProvider: Component<Props> = (props) => {
  const [session, setSession] = createSignal<SessionState>({
    status: "loading",
  });

  const { data } = supabase.auth.onAuthStateChange(async (_event, session) => {
    setSession(session ? { session, status: "auth" } : { status: "anon" });
    if (session) {
      await sendSession(session);
    }
  });

  onCleanup(() => {
    data?.subscription.unsubscribe();
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
      throw new ServerError("Session is not defined");
    }

    return state.session;
  };
};
