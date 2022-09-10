import { JSX } from "solid-js";
import { Outlet } from "solid-start";
import { Sidebar } from "~/modules/Sidebar/Sidebar";
import { supabase } from "~/utils/supabase";

// export function routeData() {
//   return createServerData(async (_, { request }) => {
//     if (await getUser(request)) {
//       throw redirect("/");
//     }
//     return {};
//   });
// }

const Home = (): JSX.Element => {
  const session = supabase.auth.session();
  return (
    <main class="text-center mx-auto text-gray-700 p-4">
      <Sidebar />
      <pre>{JSON.stringify(session, null, 2)}</pre>
      <Outlet />
    </main>
  );
};

export default Home;
