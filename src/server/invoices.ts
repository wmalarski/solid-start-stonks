import {
  Invoice,
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
