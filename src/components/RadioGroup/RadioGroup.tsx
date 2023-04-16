import { RadioGroup as KobalteRadioGroup } from "@kobalte/core";
import type { Component } from "solid-js";
import { twCx } from "../utils/twCva";

export type RadioGroupRootProps = KobalteRadioGroup.RadioGroupRootProps;

export const RadioGroupRoot: Component<RadioGroupRootProps> = (props) => {
  return (
    <KobalteRadioGroup.Root
      {...props}
      class={twCx("flex flex-col gap-2", props.class)}
    />
  );
};

export type RadioGroupLabelProps = KobalteRadioGroup.RadioGroupLabelProps;

export const RadioGroupLabel: Component<RadioGroupLabelProps> = (props) => {
  return (
    <KobalteRadioGroup.Label
      {...props}
      class={twCx("text-sm font-medium select-none", props.class)}
    />
  );
};

export type RadioGroupItemProps = KobalteRadioGroup.RadioGroupItemProps;

export const RadioGroupItem: Component<RadioGroupItemProps> = (props) => {
  return (
    <KobalteRadioGroup.Item
      {...props}
      class={twCx("flex items-center", props.class)}
    />
  );
};

export const RadioGroupItemInput = KobalteRadioGroup.ItemInput;

export type RadioGroupItemControlProps =
  KobalteRadioGroup.RadioGroupItemControlProps;

export const RadioGroupItemControl: Component<RadioGroupItemControlProps> = (
  props
) => {
  return (
    <KobalteRadioGroup.ItemControl
      {...props}
      class={twCx(
        "flex items-center justify-center h-5 w-5 rounded-xl border-gray-100 bg-white",
        "peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-blue-700",
        "data-[checked]:border-blue-700 data-[checked]:bg-blue-700",
        "data-[invalid]:border-red-500 data-[invalid]:bg-red-500",
        props.class
      )}
    />
  );
};

export type RadioGroupItemIndicatorProps =
  KobalteRadioGroup.RadioGroupItemIndicatorProps;

export const RadioGroupItemIndicator: Component<
  RadioGroupItemIndicatorProps
> = (props) => {
  return (
    <KobalteRadioGroup.ItemIndicator
      {...props}
      class={twCx("bg-black rounded-md w-3 h-3", props.class)}
    />
  );
};

export type RadioGroupItemLabelProps =
  KobalteRadioGroup.RadioGroupItemLabelProps;

export const RadioGroupItemLabel: Component<RadioGroupItemLabelProps> = (
  props
) => {
  return (
    <KobalteRadioGroup.ItemLabel
      {...props}
      class={twCx("ml-2 text-sm select-none", props.class)}
    />
  );
};

export type RadioGroupDescriptionProps =
  KobalteRadioGroup.RadioGroupDescriptionProps;

export const RadioGroupDescription: Component<RadioGroupDescriptionProps> = (
  props
) => {
  return (
    <KobalteRadioGroup.Description
      {...props}
      class={twCx("text-xs select-none", props.class)}
    />
  );
};

export type RadioGroupErrorMessageProps =
  KobalteRadioGroup.RadioGroupErrorMessageProps;

export const RadioGroupErrorMessage: Component<RadioGroupErrorMessageProps> = (
  props
) => {
  return (
    <KobalteRadioGroup.ErrorMessage
      {...props}
      class={twCx("text-xs select-none text-red-500", props.class)}
    />
  );
};
