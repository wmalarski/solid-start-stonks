import type { Component, JSX } from "solid-js";
import { twCva } from "../utils/twCva";

export const dividerClass = twCva(["divider"], {
  defaultVariants: {
    direction: "horizontal",
  },
  variants: {
    direction: {
      horizontal: ["divider-horizontal"],
      vertical: ["divider-vertical"],
    },
  },
});

export type DividerProps = JSX.HTMLAttributes<HTMLDivElement>;

export const Divider: Component<DividerProps> = (props) => {
  return <div {...props} class={dividerClass({ class: props.class })} />;
};
