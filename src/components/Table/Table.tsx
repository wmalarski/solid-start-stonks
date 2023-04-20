import type { VariantProps } from "class-variance-authority";
import type { Component, JSX } from "solid-js";
import { twCva } from "../utils/twCva";

export const tableClass = twCva(["table"], {
  defaultVariants: {
    size: "normal",
    zebra: false,
  },
  variants: {
    size: {
      compact: ["table-compact"],
      normal: ["table-normal"],
    },
    zebra: {
      false: [],
      true: ["table-zebra"],
    },
  },
});

export type TableProps = JSX.HTMLAttributes<HTMLTableElement> &
  VariantProps<typeof tableClass>;

export const Table: Component<TableProps> = (props) => {
  return <table {...props} class={tableClass({ class: props.class })} />;
};

export const tableRowClass = twCva([], {
  defaultVariants: {
    active: false,
    hover: false,
  },
  variants: {
    active: {
      false: [],
      true: ["active"],
    },
    hover: {
      false: [],
      true: ["hover"],
    },
  },
});

export type TableRowProps = JSX.HTMLAttributes<HTMLTableRowElement> &
  VariantProps<typeof tableRowClass>;

export const TableRow: Component<TableRowProps> = (props) => {
  return <tr {...props} class={tableRowClass({ class: props.class })} />;
};

export type TableHeadProps = JSX.HTMLAttributes<HTMLTableSectionElement>;

export const TableHead: Component<TableHeadProps> = (props) => {
  return <thead {...props} />;
};

export type TableBodyProps = JSX.HTMLAttributes<HTMLTableSectionElement>;

export const TableBody: Component<TableBodyProps> = (props) => {
  return <tbody {...props} />;
};

export type TableHeaderCellProps = JSX.ThHTMLAttributes<HTMLTableCellElement>;

export const TableHeaderCell: Component<TableHeaderCellProps> = (props) => {
  return <th {...props} />;
};

export type TableDataCellProps = JSX.TdHTMLAttributes<HTMLTableCellElement>;

export const TableDataCell: Component<TableDataCellProps> = (props) => {
  return <td {...props} />;
};
