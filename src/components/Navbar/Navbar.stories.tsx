import type { Meta, StoryObj } from "@storybook/html";
import type { ComponentProps } from "solid-js";

import {
  Navbar,
  NavbarCenter,
  NavbarEnd,
  NavbarStart,
  type NavbarProps,
} from "./Navbar";

type Story = StoryObj<NavbarProps>;

export const Default: Story = {
  args: {},
};

export default {
  argTypes: {},
  render: (props: NavbarProps) => (
    <Navbar {...props}>
      <NavbarStart>NavbarStart</NavbarStart>
      <NavbarCenter>NavbarCenter</NavbarCenter>
      <NavbarEnd>NavbarEnd</NavbarEnd>
    </Navbar>
  ),
  tags: ["autodocs"],
  title: "components/Navbar",
} as Meta<ComponentProps<typeof Navbar>>;
