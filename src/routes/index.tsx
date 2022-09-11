import { JSX } from "solid-js";
import { Navigate } from "solid-start";
import { paths } from "~/utils/paths";

// export const routeData = () => {
//   return createServerData(() => {
//     throw redirect(paths.dashboard);
//   });
// };

const Home = (): JSX.Element => {
  return <Navigate href={paths.invoices} />;
};

export default Home;
