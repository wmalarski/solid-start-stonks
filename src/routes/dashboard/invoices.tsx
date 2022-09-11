import { JSX } from "solid-js";
import { createServerData } from "solid-start/server";
import { useSupabaseSession } from "~/utils/supabase";

export function routeData() {
  return createServerData((_, { request }) => {
    console.log(request.headers);
    return {};
  });
}

const DashboardHome = (): JSX.Element => {
  const session = useSupabaseSession();

  return <pre>{JSON.stringify(session(), null, 2)}</pre>;
};

export default DashboardHome;
