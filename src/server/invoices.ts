import { ServerError } from "solid-start/server";
import { z } from "zod";
import {
  insertInvoice,
  selectInvoiceById,
  selectInvoicesByUserId,
} from "~/db/invoices";

type FindInvoiceArgs = {
  id: string;
  userId: string;
};

export const findInvoiceKey = (args: FindInvoiceArgs) => {
  return ["findInvoice", args] as const;
};

export const findInvoice = async (
  [, args]: ReturnType<typeof findInvoiceKey>,
  userId: string
) => {
  const invoice = await selectInvoiceById({ id: args.id, userId });

  if (!invoice) {
    return { kind: "error", message: "Not found" };
  }
  return { data: invoice, kind: "success" };
};

export type FindInvoicesArgs = {
  offset: number;
  limit: number;
  userId: string;
};

export const findInvoicesKey = (args: FindInvoicesArgs) => {
  return ["findInvoices", args] as const;
};

export type FindInvoicesResult = {
  invoices: Invoice[];
  size: number;
};

export const findInvoices = async ([, { offset, limit, userId }]: ReturnType<
  typeof findInvoicesKey
>) => {
  const { collection, total } = await selectInvoicesByUserId({
    limit,
    offset,
    userId,
  });
  return {
    data: { collection, total },
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
  id: z.string().optional(),
  invoiceTitle: z.string(),
  notes: z.string(),
  paymentAccount: z.string(),
  paymentBank: z.string(),
  paymentMethod: z.union([z.literal("cash"), z.literal("transfer")]),
  sellerAddress1: z.string(),
  sellerAddress2: z.string(),
  sellerName: z.string(),
  sellerNip: z.string(),
  serviceCount: z.coerce.number().min(0),
  servicePayed: z.coerce.number().min(0),
  servicePrice: z.coerce.number().min(0),
  serviceTitle: z.string(),
  serviceUnit: z.string(),
});

const insertInvoiceSchema = invoiceSchema.omit({ id: undefined });

const parseInsertInvoiceForm = async (form: FormData) => {
  const entries = Object.fromEntries(form.entries());
  const raw = {
    ...entries,
    date: entries.date ? new Date(entries.date as string) : undefined,
  };

  const parsed = await insertInvoiceSchema.safeParseAsync(raw);

  console.log({ parsed, entries, raw });

  if (!parsed.success) {
    throw new ServerError(JSON.stringify(parsed.error.issues));
  }

  return parsed.data;
};

export const parseAndInsertInvoice = async (form: FormData, userId: string) => {
  const parsed = await parseInsertInvoiceForm(form);

  const invoice = await insertInvoice({
    ...parsed,
    user_id: userId,
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
  };

  const parsed = await updateInvoiceSchema.safeParseAsync(raw);

  if (!parsed.success) {
    throw new ServerError(JSON.stringify(parsed.error.issues));
  }

  return parsed.data;
};

export const parseAndUpdateInvoice = async (form: FormData, userId: string) => {
  const parsed = await parseUpdateInvoiceForm(form);

  const invoice = await prisma.invoice.findFirstOrThrow({
    where: { id: parsed.id },
  });

  if (invoice.userId !== userId) {
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

export const deleteInvoice = async (form: FormData, userId: string) => {
  const parsed = await parseDeleteInvoiceForm(form);

  const invoice = await prisma.invoice.deleteMany({
    where: { id: parsed.id, userId },
  });

  return invoice;
};
