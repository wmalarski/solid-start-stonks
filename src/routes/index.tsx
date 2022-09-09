import { Link } from "@solidjs/router";
import { JSX } from "solid-js";
import Counter from "~/components/Counter";

// export function routeData() {
//   return createServerData(async (_, { request }) => {
//     if (await getUser(request)) {
//       throw redirect("/");
//     }
//     return {};
//   });
// }

const Home = (): JSX.Element => {
  return (
    <main class="text-center mx-auto text-gray-700 p-4">
      <h1 class="max-6-xs text-6xl text-sky-700 font-thin uppercase my-16">
        Hello world!
      </h1>
      <Counter />
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
        <Link href="/about" class="text-sky-600 hover:underline">
          About Page
        </Link>
        <Link href="/login" class="text-sky-600 hover:underline">
          Login
        </Link>
      </p>
    </main>
  );
};

export default Home;
