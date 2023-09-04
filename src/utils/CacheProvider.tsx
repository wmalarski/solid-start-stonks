import {
  QueryCache,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/solid-query";
import { createSignal, type Component, type JSX } from "solid-js";

type CacheProviderProps = {
  children: JSX.Element;
};

export const CacheProvider: Component<CacheProviderProps> = (
  props,
): JSX.Element => {
  const [queryClient] = createSignal(
    new QueryClient({
      defaultOptions: {
        queries: {
          enabled: typeof window !== "undefined",
        },
      },
      queryCache: new QueryCache({
        onError: async (error) => {
          const { showToast } = await import("../components/Toast");
          showToast({
            description: JSON.stringify(error, null, 2),
            title: error.name,
            variant: "error",
          });
        },
      }),
    }),
  );

  return (
    <QueryClientProvider client={queryClient()}>
      {props.children}
    </QueryClientProvider>
  );
};
