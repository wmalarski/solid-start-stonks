import { TextField } from "@kobalte/core";
import type { VariantProps } from "class-variance-authority";
import type { Component } from "solid-js";
import { twCva, twCx } from "../utils/twCva";

export type TextFieldRootProps = TextField.TextFieldRootProps;

export const TextFieldRoot: Component<TextFieldRootProps> = (props) => {
  return (
    <TextField.Root {...props} class={twCx("form-control", props.class)} />
  );
};

export type TextFieldLabelProps = TextField.TextFieldLabelProps;

export const TextFieldLabel: Component<TextFieldLabelProps> = (props) => {
  return (
    <TextField.Label {...props} class={twCx("label label-text", props.class)} />
  );
};

export type TextFieldDescriptionProps = TextField.TextFieldDescriptionProps;

export const TextFieldDescription: Component<TextFieldDescriptionProps> = (
  props,
) => {
  return (
    <TextField.Description
      {...props}
      class={twCx("label label-text-alt", props.class)}
    />
  );
};

export type TextFieldErrorMessageProps = TextField.TextFieldErrorMessageProps;

export const TextFieldErrorMessage: Component<TextFieldErrorMessageProps> = (
  props,
) => {
  return (
    <TextField.ErrorMessage
      {...props}
      class={twCx("text-sm text-red-400", props.class)}
    />
  );
};

export const textFieldInputClass = twCva(["input"], {
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
      bordered: "input-bordered",
      ghost: ["input-ghost"],
      none: [],
    },
  },
});

export type TextFieldInputProps = TextField.TextFieldInputProps &
  VariantProps<typeof textFieldInputClass>;

export const TextFieldInput: Component<TextFieldInputProps> = (props) => {
  return (
    <TextField.Input
      {...props}
      class={textFieldInputClass({ class: props.class })}
    />
  );
};

export type TextFieldTextAreaProps = TextField.TextFieldTextAreaProps &
  VariantProps<typeof textFieldInputClass>;

export const TextFieldTextArea: Component<TextFieldTextAreaProps> = (props) => {
  return (
    <TextField.TextArea
      {...props}
      class={textFieldInputClass({ class: props.class })}
    />
  );
};
