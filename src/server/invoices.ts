import { mockId, mockInvoices } from "~/tests/mocks";
import { Invoice, ResourceResult, UpdateInvoice } from "./types";

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

type FindInvoicesResult = {
  invoices: Invoice[];
  size: number;
};

export const findInvoices = {
  fn: ([
    ,
    { skip, limit },
  ]: FindInvoices): ResourceResult<FindInvoicesResult> => {
    return {
      data: {
        invoices: invoices.slice(skip, skip + limit),
        size: invoices.length,
      },
      kind: "success",
    };
  },
  key: (args: FindInvoicesArgs): FindInvoices => ["findInvoices", args],
};

type InsertInvoice = {
  data: Omit<Invoice, "id">;
};

export const insertInvoice = ({ data }: InsertInvoice) => {
  return invoices.push({ ...data, id: mockId() });
};

export const updateInvoice = (data: UpdateInvoice) => {
  const find = invoices.find((invoice) => invoice.id === data.id);
  if (!find) {
    return null;
  }
  Object.assign(find, data);
};

export const parseUpdateInvoiceForm = async (form: FormData) => {
  const entries = Object.fromEntries(form.entries());
  const raw = {
    ...entries,
    serviceCount: +entries.serviceCount,
    servicePrice: +entries.servicePrice,
  };

  return await UpdateInvoice.parseAsync(raw);
};
