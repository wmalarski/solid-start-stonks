import { Component, createEffect, createResource } from "solid-js";
import { useRouteData } from "solid-start";
import server$ from "solid-start/server";

export const routeData = () => {
  const [data] = createResource(() =>
    server$((...args) => {
      console.log("server", ...args);
      return { hello: "world" };
    })
  );
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
  return data;
};

const Invoices: Component = () => {
  const a = useRouteData<typeof routeData>();

  // const session = useSupabaseSession();

  createEffect(() => {
    console.log("createEffect", a());
  });

  return <pre>{JSON.stringify(a(), null, 2)}</pre>;
};

export default Invoices;
