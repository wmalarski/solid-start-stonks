import type { Invoice } from "@prisma/client";
import { User } from "@supabase/supabase-js";
import { ServerError } from "solid-start/server";
import { z } from "zod";
import { mockId } from "~/tests/mocks";
import { prisma } from "./prisma";
import { ResourceResult } from "./types";

export type FindInvoiceKey = ["findInvoice", string];

export const findInvoice = async (
  [, id]: FindInvoiceKey,
  user: User
): Promise<ResourceResult<Invoice>> => {
  const invoice = await prisma.invoice.findFirst({
    where: { id, userId: user.id },
  });

  if (!invoice) {
    return { kind: "error", message: "Not found" };
  }
  return { data: invoice, kind: "success" };
};

export type FindInvoicesArgs = { skip: number; limit: number };

export type FindInvoicesKey = ["findInvoices", FindInvoicesArgs];

export type FindInvoicesResult = {
  invoices: Invoice[];
  size: number;
};

export const findInvoices = async (
  [, { skip, limit }]: FindInvoicesKey,
  user: User
): Promise<ResourceResult<FindInvoicesResult>> => {
  const [invoices, size] = await Promise.all([
    prisma.invoice.findMany({
      skip,
      take: limit,
      where: { userId: user.id },
    }),
    prisma.invoice.count({
      where: { userId: user.id },
    }),
  ]);
  return {
    data: { invoices, size },
    kind: "success",
  };
};

export const invoiceSchema = z.object({
  buyerAddress1: z.string(),
  buyerAddress2: z.string(),
  buyerName: z.string(),
  buyerNip: z.string(),
  city: z.string(),
  date: z.date(),
  id: z.string(),
  invoiceTitle: z.string(),
  notes: z.string(),
  paymentAccount: z.string(),
  paymentBank: z.string(),
  paymentMethod: z.union([z.literal("cash"), z.literal("transfer")]),
  sellerAddress1: z.string(),
  sellerAddress2: z.string(),
  sellerName: z.string(),
  sellerNip: z.string(),
  serviceCount: z.number().min(0),
  servicePayed: z.number().min(0),
  servicePrice: z.number().min(0),
  serviceTitle: z.string(),
  serviceUnit: z.string(),
});

const insertInvoiceSchema = invoiceSchema.omit({ id: undefined });

const parseInsertInvoiceForm = async (form: FormData) => {
  const entries = Object.fromEntries(form.entries());
  const raw = {
    ...entries,
    date: entries.date ? new Date(entries.date as string) : undefined,
    serviceCount: +entries.serviceCount,
    servicePayed: +entries.servicePayed,
    servicePrice: +entries.servicePrice,
  };

  const parsed = await insertInvoiceSchema.safeParseAsync(raw);

  if (!parsed.success) {
    throw new ServerError(JSON.stringify(parsed.error.issues));
  }

  return parsed.data;
};

export const insertInvoice = async (form: FormData, user: User) => {
  const parsed = await parseInsertInvoiceForm(form);

  const invoice = await prisma.invoice.create({
    data: { ...parsed, id: mockId(), userId: user.id },
  });

  return invoice;
};

const updateInvoiceSchema = z.intersection(
  invoiceSchema.partial(),
  z.object({ id: z.string() })
);

const parseUpdateInvoiceForm = async (form: FormData) => {
  const entries = Object.fromEntries(form.entries());
  const raw = {
    ...entries,
    date: entries.date ? new Date(entries.date as string) : undefined,
    serviceCount: +entries.serviceCount,
    servicePayed: +entries.servicePayed,
    servicePrice: +entries.servicePrice,
  };

  const parsed = await updateInvoiceSchema.safeParseAsync(raw);

  if (!parsed.success) {
    throw new ServerError(JSON.stringify(parsed.error.issues));
  }

  return parsed.data;
};

export const updateInvoice = async (form: FormData, user: User) => {
  const parsed = await parseUpdateInvoiceForm(form);

  const invoice = await prisma.invoice.findFirstOrThrow({
    where: { id: parsed.id },
  });

  if (invoice.userId !== user.id) {
    throw new ServerError("UNAUTHORIZED");
  }

  const updated = await prisma.invoice.update({
    data: parsed,
    where: { id: parsed.id },
  });

  return updated;
};

const deleteInvoiceSchema = z.object({ id: z.string() });

const parseDeleteInvoiceForm = async (form: FormData) => {
  const entries = Object.fromEntries(form.entries());

  const parsed = await deleteInvoiceSchema.safeParseAsync(entries);

  if (!parsed.success) {
    throw new ServerError(JSON.stringify(parsed.error.issues));
  }

  return parsed.data;
};

export const deleteInvoice = async (form: FormData, user: User) => {
  const parsed = await parseDeleteInvoiceForm(form);

  const invoice = await prisma.invoice.deleteMany({
    where: { id: parsed.id, userId: user.id },
  });

  return invoice;
};
