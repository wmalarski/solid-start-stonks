import { Button as KobalteButton, Link as KobalteLink } from "@kobalte/core";
import { type VariantProps } from "class-variance-authority";
import type { Component, JSX } from "solid-js";
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

export type LinkButtonProps = KobalteLink.LinkRootProps &
  VariantProps<typeof buttonClass>;

export const LinkButton: Component<LinkButtonProps> = (props) => {
  return (
    <KobalteLink.Root {...props} class={buttonClass({ class: props.class })} />
  );
};
