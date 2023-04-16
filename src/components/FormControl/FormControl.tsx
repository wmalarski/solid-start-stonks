import type { Component, JSX } from "solid-js";
import { twCx } from "../../utils/twCva";

export const FormControl: Component<JSX.HTMLAttributes<HTMLDivElement>> = (
  props
) => {
  return <div {...props} class={twCx("form-control", props.class)} />;
};
