import type { Meta, StoryObj } from "@storybook/html";
import type { ComponentProps } from "solid-js";

import {
  RadioGroupItem,
  RadioGroupItemControl,
  RadioGroupItemIndicator,
  RadioGroupItemInput,
  RadioGroupItemLabel,
  RadioGroupLabel,
  RadioGroupRoot,
  type RadioGroupRootProps,
} from "./RadioGroup";

type Story = StoryObj<RadioGroupRootProps>;

export const Default: Story = {
  args: {},
};

export default {
  argTypes: {},
  render: (props: RadioGroupRootProps) => (
    <RadioGroupRoot {...props} class="flex flex-row items-start gap-4">
      <RadioGroupLabel>Payment</RadioGroupLabel>
      <div class="grid grid-cols-[auto_1fr] gap-1 text-sm">
        <RadioGroupItem value="cash">
          <RadioGroupItemInput />
          <RadioGroupItemControl>
            <RadioGroupItemIndicator />
          </RadioGroupItemControl>
          <RadioGroupItemLabel>Cash</RadioGroupItemLabel>
        </RadioGroupItem>
        <RadioGroupItem value="transfer">
          <RadioGroupItemInput />
          <RadioGroupItemControl>
            <RadioGroupItemIndicator />
          </RadioGroupItemControl>
          <RadioGroupItemLabel>Transfer</RadioGroupItemLabel>
        </RadioGroupItem>
      </div>
    </RadioGroupRoot>
  ),
  tags: ["autodocs"],
  title: "components/RadioGroup",
} as Meta<ComponentProps<typeof RadioGroupRoot>>;
