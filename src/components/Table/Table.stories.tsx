import type { Meta, StoryObj } from "@storybook/html";
import type { ComponentProps } from "solid-js";

import {
  Table,
  TableBody,
  TableDataCell,
  TableHead,
  TableHeaderCell,
  TableRow,
  type TableProps,
} from "./Table";

type Story = StoryObj<TableProps>;

export const Default: Story = {
  args: {
    size: "normal",
    zebra: false,
  },
};

export default {
  argTypes: {},
  render: (props: TableProps) => (
    <Table {...props}>
      <TableHead>
        <TableRow>
          <TableHeaderCell>H</TableHeaderCell>
        </TableRow>
      </TableHead>
      <TableBody>
        <TableRow>
          <TableDataCell>D</TableDataCell>
        </TableRow>
      </TableBody>
    </Table>
  ),
  tags: ["autodocs"],
  title: "components/Table",
} as Meta<ComponentProps<typeof Table>>;
