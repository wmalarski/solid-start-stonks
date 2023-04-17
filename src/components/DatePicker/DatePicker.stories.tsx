import type { Meta, StoryObj } from "@storybook/html";
import type { ComponentProps } from "solid-js";

import { DatePicker, type DatePickerProps } from "./DatePicker";

type Story = StoryObj<DatePickerProps>;

export const Default: Story = {
  args: {
    id: "date",
    isDisabled: false,
    value: new Date(),
  },
};

export default {
  argTypes: {},
  render: (props: DatePickerProps) => <DatePicker {...props} />,
  tags: ["autodocs"],
  title: "components/DatePicker",
} as Meta<ComponentProps<typeof DatePicker>>;
