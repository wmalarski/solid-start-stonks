import { JSX } from "solid-js";
import { Navigate } from "solid-start";
import { paths } from "~/utils/paths";

const MagicLink = (): JSX.Element => {
  return (
    <main class="text-center mx-auto text-gray-700 p-4">
      <Navigate href={paths.index} />
    </main>
  );
};

export default MagicLink;
