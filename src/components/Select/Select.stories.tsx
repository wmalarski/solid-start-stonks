import type { Meta, StoryObj } from "@storybook/html";
import type { ComponentProps } from "solid-js";

import { Option, Select, type SelectProps } from "./Select";

type Story = StoryObj<SelectProps>;

export const Default: Story = {
  args: {
    color: "none",
    size: "md",
    variant: "none",
  },
};

export default {
  argTypes: {},
  render: (props: SelectProps) => (
    <Select {...props}>
      <Option value="option1">Option1</Option>
      <Option value="option2">Option2</Option>
    </Select>
  ),
  tags: ["autodocs"],
  title: "components/Select",
} as Meta<ComponentProps<typeof Select>>;
