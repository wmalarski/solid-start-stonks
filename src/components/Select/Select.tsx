import { type VariantProps } from "class-variance-authority";
import type { Component, JSX } from "solid-js";
import { twCva } from "../utils/twCva";

export const selectClass = twCva(["select"], {
  defaultVariants: {
    color: "none",
    size: "md",
    variant: "none",
  },
  variants: {
    color: {
      accent: ["select-accent"],
      error: ["select-error"],
      info: ["select-info"],
      none: [],
      primary: ["select-primary"],
      secondary: ["select-secondary"],
      success: ["select-success"],
      warning: ["select-warning"],
    },
    size: {
      lg: ["select-lg"],
      md: ["select-md"],
      sm: ["select-sm"],
      xs: ["select-xs"],
    },
    variant: {
      bordered: ["select-bordered"],
      ghost: ["select-ghost"],
      none: [],
    },
  },
});

export type SelectProps = JSX.SelectHTMLAttributes<HTMLSelectElement> &
  VariantProps<typeof selectClass>;

export const Select: Component<SelectProps> = (props) => {
  return <select {...props} class={selectClass({ class: props.class })} />;
};

export type OptionProps = JSX.OptionHTMLAttributes<HTMLOptionElement>;

export const Option: Component<OptionProps> = (props) => {
  return <option {...props} />;
};
