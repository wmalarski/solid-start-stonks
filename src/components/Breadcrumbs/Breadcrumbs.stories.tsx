import type { Meta, StoryObj } from "@storybook/html";
import type { ComponentProps } from "solid-js";

import {
  BreadcrumbsItem,
  BreadcrumbsList,
  BreadcrumbsRoot,
  type BreadcrumbsRootProps,
} from "./Breadcrumbs";

type Story = StoryObj<BreadcrumbsRootProps>;

export const Default: Story = {
  args: {},
};

export default {
  argTypes: {},
  render: (props: BreadcrumbsRootProps) => (
    <BreadcrumbsRoot {...props}>
      <BreadcrumbsList>
        <BreadcrumbsItem>First</BreadcrumbsItem>
        <BreadcrumbsItem>Second</BreadcrumbsItem>
      </BreadcrumbsList>
    </BreadcrumbsRoot>
  ),
  tags: ["autodocs"],
  title: "components/Breadcrumbs",
} as Meta<ComponentProps<typeof BreadcrumbsRoot>>;
