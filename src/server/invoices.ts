import server$, { useRequest } from "solid-start/server";
import { z } from "zod";
import {
  countInvoicesByUserId,
  deleteInvoice,
  insertInvoice,
  selectInvoiceById,
  selectInvoicesByUserId,
  updateInvoice,
} from "~/db/invoices";
import { getUser } from "./auth";

const selectInvoiceArgs = z.object({
  id: z.string(),
});

export const selectInvoiceKey = (args: z.infer<typeof selectInvoiceArgs>) => {
  return ["selectInvoice", args] as const;
};

export const selectInvoiceServerQuery = server$(
  async ([, args]: ReturnType<typeof selectInvoiceKey>) => {
    const parsed = selectInvoiceArgs.parse(args);

    const event = useRequest();

    const user = await getUser({
      request: server$.request || event.request,
      locals: server$.locals || event.locals,
      env: server$.env || event.env,
    });

    return selectInvoiceById({ id: parsed.id, userId: user.id });
  },
);

const selectInvoicesArgs = z.object({
  limit: z.number(),
  offset: z.number(),
});

export const selectInvoicesKey = (args: z.infer<typeof selectInvoicesArgs>) => {
  return ["selectInvoices", args] as const;
};

export const selectAllInvoicesKey = () => {
  return ["selectInvoices"] as const;
};

export const selectInvoicesServerQuery = server$(
  async ([, args]: ReturnType<typeof selectInvoicesKey>) => {
    const parsed = selectInvoicesArgs.parse(args);

    const event = useRequest();

    const user = await getUser({
      request: server$.request || event.request,
      locals: server$.locals || event.locals,
      env: server$.env || event.env,
    });

    const [collection, total] = await Promise.all([
      selectInvoicesByUserId({
        limit: parsed.limit,
        offset: parsed.offset,
        userId: user.id,
      }),
      countInvoicesByUserId({ userId: user.id }),
    ]);

    return { collection, total };
  },
);

const invoiceSchema = z.object({
  buyer_address_1: z.string(),
  buyer_address_2: z.string(),
  buyer_name: z.string(),
  buyer_nip: z.string(),
  city: z.string(),
  date: z.coerce.date(),
  invoice_title: z.string(),
  notes: z.string(),
  payment_account: z.string(),
  payment_bank: z.string(),
  payment_method: z.string(),
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

const updateInvoiceArgs = z.intersection(
  invoiceSchema.partial(),
  z.object({ id: z.string() }),
);

export const updateInvoiceServerMutation = server$(
  async (data: z.infer<typeof updateInvoiceArgs>) => {
    const parsed = updateInvoiceArgs.parse(data);

    const user = await getUser(server$);

    await updateInvoice({
      change: parsed,
      id: parsed.id,
      userId: user.id,
    });

    return parsed;
  },
);

export const insertInvoiceServerMutation = server$(
  async (data: z.infer<typeof invoiceSchema>) => {
    const parsed = invoiceSchema.parse(data);

    const user = await getUser(server$);

    const invoice = await insertInvoice({ ...parsed, userId: user.id });

    return invoice;
  },
);

const deleteSchemaArgs = z.object({ id: z.string() });

export const deleteInvoiceServerMutation = server$(
  async (data: z.infer<typeof deleteSchemaArgs>) => {
    const parsed = deleteSchemaArgs.parse(data);

    const user = await getUser(server$);

    await deleteInvoice({ id: parsed.id, userId: user.id });

    return parsed.id;
  },
);
