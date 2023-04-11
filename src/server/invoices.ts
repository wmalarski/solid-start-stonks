import { createServerData$ } from "solid-start/server";
import {
  countInvoicesByUserId,
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

type SelectInvoicesKeyArgs = {
  offset: number;
  limit: number;
};

export const selectInvoicesKey = (args: SelectInvoicesKeyArgs) => {
  return ["selectInvoices", args] as const;
};

export const createInvoicesServerData = (
  key: () => ReturnType<typeof selectInvoicesKey>
) => {
  return createServerData$(
    async ([, { limit, offset }], { request }) => {
      const user = await getUser(request);

      const [collection, total] = await Promise.all([
        selectInvoicesByUserId({ limit, offset, userId: user.id }),
        countInvoicesByUserId({ userId: user.id }),
      ]);

      return { collection, total };
    },
    { key }
  );
};
