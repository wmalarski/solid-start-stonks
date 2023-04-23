import type { Meta, StoryObj } from "@storybook/html";
import type { ComponentProps } from "solid-js";

import { Menu, MenuItem, MenuTitle, type MenuProps } from "./Menu";

type Story = StoryObj<MenuProps>;

export const Default: Story = {
  args: {
    direction: "vertical",
    size: "normal",
  },
};

export default {
  argTypes: {},
  render: (props: MenuProps) => (
    <Menu {...props}>
      <MenuTitle>Title</MenuTitle>
      <MenuItem>Item</MenuItem>
    </Menu>
  ),
  tags: ["autodocs"],
  title: "components/Menu",
} as Meta<ComponentProps<typeof Menu>>;
