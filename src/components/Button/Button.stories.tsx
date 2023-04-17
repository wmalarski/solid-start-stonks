import type { Meta, StoryObj } from "@storybook/html";
import type { ComponentProps } from "solid-js";

import { Button, type ButtonProps } from "./Button";

type Story = StoryObj<ButtonProps>;

export const Default: Story = {
  args: {
    color: "none",
    isDisabled: false,
    isLoading: false,
    size: "md",
    variant: "none",
  },
};

export default {
  argTypes: {},
  render: (props: ButtonProps) => <Button {...props} />,
  tags: ["autodocs"],
  title: "components/Button",
} as Meta<ComponentProps<typeof Button>>;
