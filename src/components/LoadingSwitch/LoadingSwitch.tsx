/* eslint-disable @typescript-eslint/naming-convention */
import { JSX, Resource, Show } from "solid-js";
import { ResourceResult } from "~/server/types";

type Props<TData> = {
  children: JSX.Element | ((data: TData) => JSX.Element);
  fallback?: JSX.Element;
  loading?: JSX.Element;
  resource: Resource<ResourceResult<TData> | undefined>;
};

export function LoadingSwitch<TData>(props: Props<TData>): JSX.Element {
  const children = () => {
    const resource = props.resource();
    if (resource?.kind !== "success") {
      return null;
    }
    if (typeof props.children === "function") {
      return props.children(resource.data);
    }
    return props.children;
  };

  return (
    <Show when={props.resource()} fallback={props.loading}>
      <Show
        when={props.resource()?.kind === "success"}
        fallback={props.fallback}
      >
        {children()}
      </Show>
    </Show>
  );
}
