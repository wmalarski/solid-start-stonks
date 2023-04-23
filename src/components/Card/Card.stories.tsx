import type { Meta, StoryObj } from "@storybook/html";
import type { ComponentProps } from "solid-js";

import { Card, CardActions, CardBody, CardTitle, type CardProps } from "./Card";

type Story = StoryObj<CardProps>;

export const Default: Story = {
  args: {
    size: "none",
    variant: "none",
  },
};

export default {
  argTypes: {},
  render: (props: CardProps) => (
    <Card {...props}>
      <CardTitle component="h2">Title</CardTitle>
      <CardBody component="div">Body</CardBody>
      <CardActions>Actions</CardActions>
    </Card>
  ),
  tags: ["autodocs"],
  title: "components/Card",
} as Meta<ComponentProps<typeof Card>>;
