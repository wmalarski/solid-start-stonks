import type { Component, JSX } from "solid-js";
import { twCx } from "../../utils/twCva";

export type FormControlProps = JSX.HTMLAttributes<HTMLDivElement>;

export const FormControl: Component<FormControlProps> = (props) => {
  return <div {...props} class={twCx("form-control", props.class)} />;
};
