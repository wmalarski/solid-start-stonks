import { Link } from "@solidjs/router";
import { JSX } from "solid-js";
import Counter from "~/components/Counter";
import { Sidebar } from "~/modules/Sidebar/Sidebar";
import { paths } from "~/utils/paths";
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
      <h1 class="max-6-xs text-6xl text-sky-700 font-thin uppercase my-16">
        Hello world!
      </h1>
      <Counter />
      <pre>{JSON.stringify(session, null, 2)}</pre>
      <p class="mt-8">
        Visit{" "}
        <Link
          href="https://solidjs.com"
          target="_blank"
          class="text-sky-600 hover:underline"
        >
          solidjs.com
        </Link>
        to learn how to build Solid apps.
      </p>
      <p class="my-4">
        <span>Home</span>
        <Link href={paths.about} class="text-sky-600 hover:underline">
          About Page
        </Link>
        <Link href={paths.login} class="text-sky-600 hover:underline">
          Login
        </Link>
      </p>
    </main>
  );
};

export default Home;
