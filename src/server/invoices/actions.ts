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
import { getUser } from "../auth";

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
      env: server$.env || event.env,
      locals: server$.locals || event.locals,
      request: server$.request || event.request,
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
      env: server$.env || event.env,
      locals: server$.locals || event.locals,
      request: server$.request || event.request,
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
  buyerAddress1: z.string(),
  buyerAddress2: z.string(),
  buyerName: z.string(),
  buyerNip: z.string(),
  city: z.string(),
  date: z.coerce.date(),
  invoiceTitle: z.string(),
  notes: z.string(),
  paymentAccount: z.string(),
  paymentBank: z.string(),
  paymentMethod: z.string(),
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
