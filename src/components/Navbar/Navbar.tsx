import type { Component, JSX } from "solid-js";
import { twCx } from "../utils/twCva";

export type NavbarProps = JSX.HTMLAttributes<HTMLDivElement>;

export const Navbar: Component<NavbarProps> = (props) => {
  return <div {...props} class={twCx("navbar", props.class)} />;
};

export type NavbarStartProps = JSX.HTMLAttributes<HTMLDivElement>;

export const NavbarStart: Component<NavbarStartProps> = (props) => {
  return <div {...props} class={twCx("navbar-start", props.class)} />;
};

export type NavbarCenterProps = JSX.HTMLAttributes<HTMLDivElement>;

export const NavbarCenter: Component<NavbarCenterProps> = (props) => {
  return <div {...props} class={twCx("navbar-center", props.class)} />;
};

export type NavbarEndProps = JSX.HTMLAttributes<HTMLDivElement>;

export const NavbarEnd: Component<NavbarEndProps> = (props) => {
  return <div {...props} class={twCx("navbar-end", props.class)} />;
};
