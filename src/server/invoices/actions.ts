import server$, { useRequest } from "solid-start/server";
import * as v from "valibot";
import {
  createInvoice,
  deleteInvoice,
  queryInvoice,
  queryInvoices,
  updateInvoice,
} from "./api";

const selectInvoiceArgs = () => {
  return v.object({
    id: v.coerce(v.number(), Number),
  });
};

export const selectInvoiceKey = (
  args: v.Input<ReturnType<typeof selectInvoiceArgs>>,
) => {
  return ["selectInvoice", args] as const;
};

export const selectInvoiceServerQuery = server$(
  ([, args]: ReturnType<typeof selectInvoiceKey>) => {
    const parsed = v.parse(selectInvoiceArgs(), args);

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

const selectInvoicesArgs = () => {
  return v.object({
    startCursor: v.optional(v.string()),
  });
};

export const selectInvoicesKey = (
  args: v.Input<ReturnType<typeof selectInvoicesArgs>>,
) => {
  return ["selectInvoices", args] as const;
};

export const selectAllInvoicesKey = () => {
  return ["selectInvoices"] as const;
};

export const selectInvoicesServerQuery = server$(
  async ([, args]: ReturnType<typeof selectInvoicesKey>) => {
    const parsed = v.parse(selectInvoicesArgs(), args);

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

const invoiceSchema = () => {
  return v.object({
    buyerAddress1: v.string(),
    buyerAddress2: v.string(),
    buyerName: v.string(),
    buyerNip: v.string(),
    city: v.string(),
    date: v.string(),
    invoiceTitle: v.string(),
    notes: v.string(),
    paymentAccount: v.string(),
    paymentBank: v.string(),
    paymentMethod: v.string(),
    sellerAddress1: v.string(),
    sellerAddress2: v.string(),
    sellerName: v.string(),
    sellerNip: v.string(),
    serviceCount: v.coerce(v.number([v.minValue(0)]), Number),
    servicePayed: v.coerce(v.number([v.minValue(0)]), Number),
    servicePrice: v.coerce(v.number([v.minValue(0)]), Number),
    serviceTitle: v.string(),
    serviceUnit: v.string(),
  });
};

const updateInvoiceArgs = () => {
  return v.merge([
    invoiceSchema(),
    v.object({ id: v.coerce(v.number(), Number) }),
  ]);
};

export const updateInvoiceServerMutation = server$(
  async (data: v.Input<ReturnType<typeof updateInvoiceArgs>>) => {
    const parsed = v.parse(updateInvoiceArgs(), data);

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
  async (data: v.Input<ReturnType<typeof invoiceSchema>>) => {
    const parsed = v.parse(invoiceSchema(), data);

    // const user = await getUser(server$);

    const invoice = await createInvoice({ event: server$, invoice: parsed });

    return invoice;
  },
);

const deleteSchemaArgs = () => {
  return v.object({ id: v.coerce(v.number(), Number) });
};

export const deleteInvoiceServerMutation = server$(
  async (data: v.Input<ReturnType<typeof deleteSchemaArgs>>) => {
    const parsed = v.parse(deleteSchemaArgs(), data);

    await deleteInvoice({ event: server$, id: parsed.id });

    return parsed.id;
  },
);
