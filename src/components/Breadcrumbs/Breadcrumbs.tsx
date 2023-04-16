import { Breadcrumbs as KobalteBreadcrumbs } from "@kobalte/core";
import { Component, JSX, Show } from "solid-js";
import { twCx } from "../utils/twCva";

export type BreadcrumbsRootProps = KobalteBreadcrumbs.BreadcrumbsRootProps;

export const BreadcrumbsRoot: Component<BreadcrumbsRootProps> = (props) => {
  return (
    <KobalteBreadcrumbs.Root
      {...props}
      class={twCx("breadcrumbs text-sm", props.class)}
    />
  );
};

export type BreadcrumbsSeparatorProps =
  KobalteBreadcrumbs.BreadcrumbsSeparatorProps;

export const BreadcrumbsSeparator: Component<BreadcrumbsSeparatorProps> = (
  props
) => {
  return (
    <KobalteBreadcrumbs.Separator
      {...props}
      class={twCx("inline-block my-0 mx-1", props.class)}
    />
  );
};

export type BreadcrumbsLinkProps = KobalteBreadcrumbs.BreadcrumbsLinkProps;

export const BreadcrumbsLink: Component<BreadcrumbsLinkProps> = (props) => {
  return <KobalteBreadcrumbs.Link {...props} class={twCx(props.class)} />;
};

export type BreadcrumbsListProps = JSX.OlHTMLAttributes<HTMLOListElement>;

export const BreadcrumbsList: Component<BreadcrumbsListProps> = (props) => {
  return <ol {...props} />;
};

export type BreadcrumbsItemProps = BreadcrumbsLinkProps & {
  hasSeparator?: boolean;
};

export const BreadcrumbsItem: Component<BreadcrumbsItemProps> = (props) => {
  return (
    <li>
      <BreadcrumbsLink {...props} />
      <Show when={props.hasSeparator}>
        <BreadcrumbsSeparator />
      </Show>
    </li>
  );
};
