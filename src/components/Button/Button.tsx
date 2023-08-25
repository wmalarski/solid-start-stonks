import { Button as KobalteButton } from "@kobalte/core";
import { type VariantProps } from "class-variance-authority";
import type { Component, ComponentProps, JSX } from "solid-js";
import { A } from "solid-start";
import { twCva } from "../utils/twCva";

export const buttonClass = twCva(["btn"], {
  defaultVariants: {
    color: "none",
    isLoading: false,
    size: "md",
    variant: "none",
  },
  variants: {
    color: {
      accent: ["btn-accent"],
      error: ["btn-error"],
      info: ["btn-info"],
      none: [],
      primary: ["btn-primary"],
      secondary: ["btn-secondary"],
      success: ["btn-success"],
      warning: ["btn-warning"],
    },
    isLoading: {
      false: [],
      true: ["loading"],
    },
    size: {
      block: ["btn-block"],
      circle: ["btn-circle"],
      lg: ["btn-lg"],
      md: ["btn-md"],
      sm: ["btn-sm"],
      square: ["btn-square"],
      wide: ["btn-wide"],
      xs: ["btn-xs"],
    },
    variant: {
      active: ["btn-active"],
      disabled: ["btn-disabled"],
      ghost: ["btn-ghost"],
      glass: ["glass"],
      link: ["btn-link"],
      none: [],
      outline: ["btn-outline"],
    },
  },
});

export type ButtonProps = KobalteButton.ButtonRootProps &
  VariantProps<typeof buttonClass>;

export const Button: Component<ButtonProps> = (props) => {
  return (
    <KobalteButton.Root
      {...props}
      class={buttonClass({ class: props.class })}
    />
  );
};

export const buttonGroupClass = twCva(["btn-group"], {
  defaultVariants: {
    direction: "none",
  },
  variants: {
    direction: {
      horizontal: ["btn-group-horizontal"],
      none: [],
      vertical: ["btn-group-vertical"],
    },
  },
});

export type ButtonGroupProps = JSX.HTMLAttributes<HTMLDivElement> &
  VariantProps<typeof buttonGroupClass>;

export const ButtonGroup: Component<ButtonGroupProps> = (props) => {
  return <div {...props} class={buttonGroupClass({ class: props.class })} />;
};

export type LinkButtonProps = ComponentProps<typeof A> &
  VariantProps<typeof buttonClass>;

export const LinkButton: Component<LinkButtonProps> = (props) => {
  return <A {...props} class={buttonClass({ class: props.class })} />;
};
