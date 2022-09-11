import { Component } from "solid-js";
import { useRouteData } from "solid-start";

export const routeData = () => {
  // const result =
  // return createServerData(
  //   (...args) => {
  //     console.log("first", args);
  //     return "first-arg";
  //   },
  //   (...args) => {
  //     console.log("second", args);
  //     return "second-arg";
  //   }
  // );
  return { hello: "world" };
};

const Invoices: Component = () => {
  const a = useRouteData<typeof routeData>();

  // const session = useSupabaseSession();

  // createEffect(() => {
  //   console.log(a);
  // });

  return <pre>{JSON.stringify(a, null, 2)}</pre>;
};

export default Invoices;
