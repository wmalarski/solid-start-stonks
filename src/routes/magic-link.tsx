import { JSX } from "solid-js";
import { Navigate } from "solid-start";
import { paths } from "~/utils/paths";

// const fetcher = async () => {
//   const { data, error } = await supabase.auth.getSessionFromUrl({
//     storeSession: true,
//   });
//   console.log("fetcher", { data, error });
//   return { data, error };
// };

const MagicLink = (): JSX.Element => {
  // const [data] = createResource(fetcher);

  return (
    <main class="text-center mx-auto text-gray-700 p-4">
      <Navigate href={paths.index} />
      {/* <Show when={data()} keyed>
        {(result) => (
          <div>
            <span>Loading magic link</span>
            <pre>{JSON.stringify(result, null, 2)}</pre>
          </div>
        )}
      </Show> */}
    </main>
  );
};

export default MagicLink;
