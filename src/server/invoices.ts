import { createServerData$ } from "solid-start/server";
import {
  Invoice,
  selectInvoiceById,
  selectInvoicesByUserId,
} from "~/db/invoices";
import { getUser } from "./auth";

type SelectInvoiceKeyArgs = {
  id: string;
};

export const selectInvoiceKey = (args: SelectInvoiceKeyArgs) => {
  return ["selectInvoice", args] as const;
};

export const createInvoiceServerData = (
  key: () => ReturnType<typeof selectInvoiceKey>
) => {
  return createServerData$(
    async ([, { id }], { request }) => {
      const user = await getUser(request);
      return selectInvoiceById({ id, userId: user.id });
    },
    { key }
  );
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
