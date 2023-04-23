import type { Meta, StoryObj } from "@storybook/html";
import type { ComponentProps } from "solid-js";

import { Pagination, type PaginationProps } from "./Pagination";

type Story = StoryObj<PaginationProps>;

export const Default: Story = {
  args: {
    current: 1,
    max: 10,
  },
};

export default {
  argTypes: {},
  render: (props: PaginationProps) => <Pagination {...props} />,
  tags: ["autodocs"],
  title: "components/Pagination",
} as Meta<ComponentProps<typeof Pagination>>;
