import server$, { useRequest } from "solid-start/server";
import { z } from "zod";
import {
  createInvoice,
  deleteInvoice,
  queryInvoice,
  queryInvoices,
  updateInvoice,
} from "./api";

const selectInvoiceArgs = z.object({
  id: z.coerce.number(),
});

export const selectInvoiceKey = (args: z.infer<typeof selectInvoiceArgs>) => {
  return ["selectInvoice", args] as const;
};

export const selectInvoiceServerQuery = server$(
  ([, args]: ReturnType<typeof selectInvoiceKey>) => {
    const parsed = selectInvoiceArgs.parse(args);

    const requestEvent = useRequest();

    const event = {
      clientAddress: server$.clientAddress || requestEvent.clientAddress,
      env: server$.env || requestEvent.env,
      fetch: server$.fetch || requestEvent.fetch,
      locals: server$.locals || requestEvent.locals,
      request: server$.request || requestEvent.request,
    };

    // const user = await getUser(event);

    return queryInvoice({
      event,
      id: parsed.id,
    });
  },
);

const selectInvoicesArgs = z.object({
  startCursor: z.string().optional(),
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

    const requestEvent = useRequest();

    const event = {
      clientAddress: server$.clientAddress || requestEvent.clientAddress,
      env: server$.env || requestEvent.env,
      fetch: server$.fetch || requestEvent.fetch,
      locals: server$.locals || requestEvent.locals,
      request: server$.request || requestEvent.request,
    };

    // const user = await getUser({
    //   env: server$.env || event.env,
    //   locals: server$.locals || event.locals,
    //   request: server$.request || event.request,
    // });

    const [collection] = await Promise.all([
      queryInvoices({
        event,
        startCursor: parsed.startCursor,
        // limit: parsed.limit,
        // offset: parsed.offset,
        // userId: user.id,
      }),
      // countInvoicesByUserId({ userId: user.id }),
    ]);

    return { collection, total: 10 };
  },
);

const invoiceSchema = z.object({
  buyerAddress1: z.string(),
  buyerAddress2: z.string(),
  buyerName: z.string(),
  buyerNip: z.string(),
  city: z.string(),
  date: z.string(),
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
  invoiceSchema,
  z.object({ id: z.coerce.number() }),
);

export const updateInvoiceServerMutation = server$(
  async (data: z.infer<typeof updateInvoiceArgs>) => {
    const parsed = updateInvoiceArgs.parse(data);

    // const user = await getUser(server$);

    await updateInvoice({
      event: server$,
      invoice: parsed,
      // userId: user.id,
    });

    return parsed;
  },
);

export const insertInvoiceServerMutation = server$(
  async (data: z.infer<typeof invoiceSchema>) => {
    const parsed = invoiceSchema.parse(data);

    // const user = await getUser(server$);

    const invoice = await createInvoice({ event: server$, invoice: parsed });

    return invoice;
  },
);

const deleteSchemaArgs = z.object({ id: z.coerce.number() });

export const deleteInvoiceServerMutation = server$(
  async (data: z.infer<typeof deleteSchemaArgs>) => {
    const parsed = deleteSchemaArgs.parse(data);

    await deleteInvoice({ event: server$, id: parsed.id });

    return parsed.id;
  },
);
