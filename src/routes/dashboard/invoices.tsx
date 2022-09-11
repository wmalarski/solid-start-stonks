import { JSX } from "solid-js";
import { useSupabaseSession } from "~/utils/supabase";

const DashboardHome = (): JSX.Element => {
  const session = useSupabaseSession();

  return <pre>{JSON.stringify(session(), null, 2)}</pre>;
};

export default DashboardHome;
