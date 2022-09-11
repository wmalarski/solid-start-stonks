import { JSX } from "solid-js";
import { useSupabaseSession } from "~/utils/supabase";

// export function routeData() {
//   return createServerData((_, { request }) => {
//     // console.log(request.headers);
//     return {};
//   });
// }

const Invoices = (): JSX.Element => {
  const session = useSupabaseSession();

  return <pre>{JSON.stringify(session(), null, 2)}</pre>;
};

export default Invoices;
