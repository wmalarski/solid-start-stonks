import type { Component, JSX } from "solid-js";
import { twCx } from "../../utils/twCva";

export const Label: Component<JSX.LabelHTMLAttributes<HTMLLabelElement>> = (
  props
) => {
  // eslint-disable-next-line jsx-a11y/label-has-associated-control
  return <label {...props} class={twCx("label", props.class)} />;
};
