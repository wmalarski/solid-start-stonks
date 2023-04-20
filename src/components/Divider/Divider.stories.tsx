import type { Meta, StoryObj } from "@storybook/html";
import type { ComponentProps } from "solid-js";

import { Divider, type DividerProps } from "./Divider";

type Story = StoryObj<DividerProps>;

export const Default: Story = {
  args: {
    direction: "horizontal",
  },
};

export default {
  argTypes: {},
  render: (props: DividerProps) => <Divider {...props} />,
  tags: ["autodocs"],
  title: "components/Divider",
} as Meta<ComponentProps<typeof Divider>>;
