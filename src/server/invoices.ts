import { mockId, mockInvoices } from "~/tests/mocks";
import { Invoice, ResourceResult } from "./types";

const invoices = mockInvoices(23);

type FindInvoice = ["findInvoice", string];

export const findInvoice = {
  fn: ([, id]: FindInvoice): ResourceResult<Invoice> => {
    const find = invoices.find((invoice) => invoice.id === id);
    if (!find) {
      return { kind: "error", message: "Not found" };
    }
    return { data: find, kind: "success" };
  },
  key: (id: string): FindInvoice => ["findInvoice", id],
};

type FindInvoicesArgs = { skip: number; limit: number };

type FindInvoices = ["findInvoices", FindInvoicesArgs];

export const findInvoices = {
  fn: ([, { skip, limit }]: FindInvoices): ResourceResult<Invoice[]> => {
    return { data: invoices.slice(skip, skip + limit), kind: "success" };
  },
  key: (args: FindInvoicesArgs): FindInvoices => ["findInvoices", args],
};

type InsertInvoice = {
  data: Omit<Invoice, "id">;
};

export const insertInvoice = ({ data }: InsertInvoice) => {
  return invoices.push({ ...data, id: mockId() });
};

type UpdateInvoice = {
  data: Invoice;
};

export const updateInvoice = ({ data }: UpdateInvoice) => {
  const find = invoices.find((invoice) => invoice.id === data.id);
  if (!find) {
    return null;
  }
  Object.assign(find, data);
};
