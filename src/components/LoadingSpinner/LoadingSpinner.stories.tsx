import type { Meta, StoryObj } from "@storybook/html";
import type { ComponentProps } from "solid-js";

import { LoadingSpinner } from "./LoadingSpinner";

type Story = StoryObj<Record<string, never>>;

export const Default: Story = {
  args: {},
};

export default {
  argTypes: {},
  render: () => <LoadingSpinner />,
  tags: ["autodocs"],
  title: "components/LoadingSpinner",
} as Meta<ComponentProps<typeof LoadingSpinner>>;
