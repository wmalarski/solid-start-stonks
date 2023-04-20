import type { Component, JSX } from "solid-js";
import { twCva, twCx } from "../utils/twCva";

export const menuClass = twCva(["menu"], {
  defaultVariants: {
    direction: "vertical",
    size: "normal",
  },
  variants: {
    direction: {
      horizontal: ["menu-horizontal"],
      vertical: ["menu-vertical"],
    },
    size: {
      compact: ["menu-compact"],
      normal: ["menu-normal"],
    },
  },
});

export type MenuProps = JSX.HTMLAttributes<HTMLUListElement>;

export const Menu: Component<MenuProps> = (props) => {
  return <ul {...props} class={menuClass({ class: props.class })} />;
};

export const menuItemClass = twCva([], {
  defaultVariants: {
    active: false,
    bordered: false,
    disabled: false,
    hoverBordered: false,
  },
  variants: {
    active: {
      false: [],
      true: ["active"],
    },
    bordered: {
      false: [],
      true: ["bordered"],
    },
    disabled: {
      false: [],
      true: ["disabled"],
    },
    hoverBordered: {
      false: [],
      true: ["hover-bordered"],
    },
  },
});

export type MenuTitleProps = JSX.LiHTMLAttributes<HTMLLIElement>;

export const MenuTitle: Component<MenuTitleProps> = (props) => {
  return (
    <li
      {...props}
      class={menuItemClass({ class: twCx("menu-title", props.class) })}
    />
  );
};

export type MenuItemProps = JSX.LiHTMLAttributes<HTMLLIElement>;

export const MenuItem: Component<MenuItemProps> = (props) => {
  return <li {...props} class={menuItemClass({ class: props.class })} />;
};
