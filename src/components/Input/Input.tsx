import type { VariantProps } from "class-variance-authority";
import type { Component, JSX } from "solid-js";
import { twCva } from "../../utils/twCva";

export const inputClass = twCva(["input"], {
  defaultVariants: {
    color: "none",
    size: "md",
    variant: "none",
  },
  variants: {
    color: {
      accent: ["input-accent"],
      error: ["input-error"],
      info: ["input-info"],
      none: [],
      primary: ["input-primary"],
      secondary: ["input-secondary"],
      success: ["input-success"],
      warning: ["input-warning"],
    },
    size: {
      lg: ["input-lg"],
      md: ["input-md"],
      sm: ["input-sm"],
      xs: ["input-xs"],
    },
    variant: {
      bordered: ["input-bordered"],
      ghost: ["input-ghost"],
      none: [],
    },
  },
});

type InputProps = VariantProps<typeof inputClass>;

export const Input: Component<
  JSX.InputHTMLAttributes<HTMLInputElement> & InputProps
> = (props) => {
  return <input {...props} class={inputClass({ class: props.class })} />;
};
