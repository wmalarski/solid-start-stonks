import type { Meta, StoryObj } from "@storybook/html";

import { Show } from "solid-js";
import {
  TextFieldErrorMessage,
  TextFieldInput,
  TextFieldLabel,
  TextFieldRoot,
} from "./TextField";

type Props = {
  error: string;
  id: string;
  isLoading: boolean;
  label: string;
  name: string;
  type: string;
  value: string;
};

type Story = StoryObj<Props>;

export const Default: Story = {
  args: {},
};

export default {
  argTypes: {},
  render: (props: Props) => (
    <TextFieldRoot>
      <TextFieldLabel for={props.id} class="font-semibold">
        {props.label}
      </TextFieldLabel>
      <div class="flex w-full flex-col gap-2">
        <TextFieldInput
          class="grow"
          variant="bordered"
          size="sm"
          disabled={props.isLoading}
          id={props.id}
          name={props.name}
          placeholder={props.label}
          type={props.type}
          value={props.value}
        />
        <Show when={props.error}>
          <TextFieldErrorMessage>{props.error}</TextFieldErrorMessage>
        </Show>
      </div>
    </TextFieldRoot>
  ),
  tags: ["autodocs"],
  title: "components/TextField",
} as Meta<Props>;
