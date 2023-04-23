import type { VariantProps } from "class-variance-authority";
import type { Component, JSX } from "solid-js";
import { twCva } from "../utils/twCva";

export const dividerClass = twCva(["divider bg-gray-200"], {
  defaultVariants: {
    direction: "horizontal",
  },
  variants: {
    direction: {
      horizontal: ["divider-horizontal w-full h-[1px]"],
      vertical: ["divider-vertical h-full w-[1px]"],
    },
  },
});

export type DividerProps = JSX.HTMLAttributes<HTMLDivElement> &
  VariantProps<typeof dividerClass>;

export const Divider: Component<DividerProps> = (props) => {
  return <div {...props} class={dividerClass({ class: props.class })} />;
};
