import { ServerError } from "solid-start/server";
import { mockId, mockInvoices } from "~/tests/mocks";
import { InsertInvoice, Invoice, ResourceResult, UpdateInvoice } from "./types";

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

const parseInsertInvoiceForm = async (form: FormData) => {
  const entries = Object.fromEntries(form.entries());
  const raw = {
    ...entries,
    serviceCount: +entries.serviceCount,
    servicePrice: +entries.servicePrice,
  };

  const parsed = await InsertInvoice.safeParseAsync(raw);

  if (!parsed.success) {
    throw new ServerError(JSON.stringify(parsed.error.issues));
  }

  return parsed.data;
};

export const insertInvoice = async (form: FormData) => {
  const parsed = await parseInsertInvoiceForm(form);
  const invoice = { ...parsed, id: mockId() };

  invoices.push(invoice);

  return invoice;
};

const parseUpdateInvoiceForm = async (form: FormData) => {
  const entries = Object.fromEntries(form.entries());
  const raw = {
    ...entries,
    serviceCount: +entries.serviceCount,
    servicePrice: +entries.servicePrice,
  };

  const parsed = await UpdateInvoice.safeParseAsync(raw);

  if (!parsed.success) {
    throw new ServerError(JSON.stringify(parsed.error.issues));
  }

  return parsed.data;
};

export const updateInvoice = async (form: FormData) => {
  const parsed = await parseUpdateInvoiceForm(form);

  const find = invoices.find((invoice) => invoice.id === parsed.id);

  if (!find) {
    return null;
  }

  Object.assign(find, parsed);

  return find;
};
