import server$, { useRequest } from "solid-start/server";
import {
  coerce,
  merge,
  minValue,
  number,
  object,
  optional,
  parse,
  string,
  type Input,
} from "valibot";
import { getSessionOrThrow } from "../auth/session";
import {
  createInvoice,
  deleteInvoice,
  queryInvoice,
  queryInvoices,
  updateInvoice,
} from "./api";

const selectInvoiceArgs = () => {
  return object({
    id: coerce(number(), Number),
  });
};

export const selectInvoiceKey = (
  args: Input<ReturnType<typeof selectInvoiceArgs>>,
) => {
  return ["selectInvoice", args] as const;
};

export const selectInvoiceServerQuery = server$(
  ([, args]: ReturnType<typeof selectInvoiceKey>) => {
    const parsed = parse(selectInvoiceArgs(), args);

    const requestEvent = useRequest();

    const event = {
      clientAddress: server$.clientAddress || requestEvent.clientAddress,
      env: server$.env || requestEvent.env,
      fetch: server$.fetch || requestEvent.fetch,
      locals: server$.locals || requestEvent.locals,
      request: server$.request || requestEvent.request,
    };

    getSessionOrThrow(event);

    return queryInvoice({
      event,
      id: parsed.id,
    });
  },
);

const selectInvoicesArgs = () => {
  return object({
    startCursor: optional(string()),
  });
};

export const selectInvoicesKey = (
  args: Input<ReturnType<typeof selectInvoicesArgs>>,
) => {
  return ["selectInvoices", args] as const;
};

export const selectAllInvoicesKey = () => {
  return ["selectInvoices"] as const;
};

export const selectInvoicesServerQuery = server$(
  async ([, args]: ReturnType<typeof selectInvoicesKey>) => {
    const parsed = parse(selectInvoicesArgs(), args);

    const requestEvent = useRequest();

    const event = {
      clientAddress: server$.clientAddress || requestEvent.clientAddress,
      env: server$.env || requestEvent.env,
      fetch: server$.fetch || requestEvent.fetch,
      locals: server$.locals || requestEvent.locals,
      request: server$.request || requestEvent.request,
    };

    getSessionOrThrow(event);

    const [collection] = await Promise.all([
      queryInvoices({
        event,
        startCursor: parsed.startCursor,
        // limit: parsed.limit,
        // offset: parsed.offset,
      }),
      // countInvoicesByUserId({ userId: user.id }),
    ]);

    return { collection, total: 10 };
  },
);

const invoiceSchema = () => {
  return object({
    buyerAddress1: string(),
    buyerAddress2: string(),
    buyerName: string(),
    buyerNip: string(),
    city: string(),
    date: string(),
    invoiceTitle: string(),
    notes: string(),
    paymentAccount: string(),
    paymentBank: string(),
    paymentMethod: string(),
    sellerAddress1: string(),
    sellerAddress2: string(),
    sellerName: string(),
    sellerNip: string(),
    serviceCount: coerce(number([minValue(0)]), Number),
    servicePayed: coerce(number([minValue(0)]), Number),
    servicePrice: coerce(number([minValue(0)]), Number),
    serviceTitle: string(),
    serviceUnit: string(),
  });
};

const updateInvoiceArgs = () => {
  return merge([invoiceSchema(), object({ id: coerce(number(), Number) })]);
};

export const updateInvoiceServerMutation = server$(
  async (data: Input<ReturnType<typeof updateInvoiceArgs>>) => {
    const parsed = parse(updateInvoiceArgs(), data);

    getSessionOrThrow(server$);

    await updateInvoice({
      event: server$,
      invoice: parsed,
    });

    return parsed;
  },
);

export const insertInvoiceServerMutation = server$(
  async (data: Input<ReturnType<typeof invoiceSchema>>) => {
    const parsed = parse(invoiceSchema(), data);

    getSessionOrThrow(server$);

    const invoice = await createInvoice({ event: server$, invoice: parsed });

    return invoice;
  },
);

const deleteSchemaArgs = () => {
  return object({ id: coerce(number(), Number) });
};

export const deleteInvoiceServerMutation = server$(
  async (data: Input<ReturnType<typeof deleteSchemaArgs>>) => {
    const parsed = parse(deleteSchemaArgs(), data);

    getSessionOrThrow(server$);

    await deleteInvoice({ event: server$, id: parsed.id });

    return parsed.id;
  },
);
