import { z } from "zod";
import {
  Invoice,
  deleteInvoice,
  insertInvoice,
  selectInvoiceById,
  selectInvoicesByUserId,
  updateInvoice,
} from "~/db/invoices";
import { zodFormParse } from "./utils";

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
  buyer_address1: z.string(),
  buyer_address2: z.string(),
  buyer_name: z.string(),
  buyer_nip: z.string(),
  city: z.string(),
  date: z.date(),
  id: z.string().optional(),
  invoice_title: z.string(),
  notes: z.string(),
  payment_account: z.string(),
  payment_bank: z.string(),
  payment_method: z.union([z.literal("cash"), z.literal("transfer")]),
  seller_address1: z.string(),
  seller_address2: z.string(),
  seller_name: z.string(),
  seller_nip: z.string(),
  service_count: z.coerce.number().min(0),
  service_payed: z.coerce.number().min(0),
  service_price: z.coerce.number().min(0),
  service_title: z.string(),
  service_unit: z.string(),
});

const insertInvoiceSchema = invoiceSchema.omit({ id: undefined });

export const handleInsertInvoiceAction = async (
  form: FormData,
  userId: string
) => {
  const parsed = await zodFormParse({ form, schema: insertInvoiceSchema });

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

export const handleUpdateInvoiceAction = async (
  form: FormData,
  userId: string
) => {
  const parsed = await zodFormParse({ form, schema: updateInvoiceSchema });

  return updateInvoice({ change: parsed, id: parsed.id, userId });
};

const deleteInvoiceSchema = z.object({ id: z.string() });

export const handleDeleteInvoiceAction = async (
  form: FormData,
  userId: string
) => {
  const data = await zodFormParse({ form, schema: deleteInvoiceSchema });

  return deleteInvoice({ id: data.id, userId });
};
