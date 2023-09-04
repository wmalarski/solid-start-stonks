import server$, { useRequest } from "solid-start/server";
import {
  coerce,
  merge,
  minValue,
  number,
  object,
  optional,
  parseAsync,
  string,
  type Input,
} from "valibot";
import { getSessionOrThrow } from "../auth/session";
import {
  createInvoice,
  deleteInvoice,
  getInvoice,
  queryInvoices,
  updateInvoice,
} from "./api";

const selectInvoiceArgs = () => {
  return object({ id: string() });
};

export const selectInvoiceKey = (
  args: Input<ReturnType<typeof selectInvoiceArgs>>,
) => {
  return ["selectInvoice", args] as const;
};

export const selectInvoiceServerQuery = server$(
  async ([, args]: ReturnType<typeof selectInvoiceKey>) => {
    const parsed = await parseAsync(selectInvoiceArgs(), args);

    const requestEvent = useRequest();

    const event = {
      clientAddress: server$.clientAddress || requestEvent.clientAddress,
      env: server$.env || requestEvent.env,
      fetch: server$.fetch || requestEvent.fetch,
      locals: server$.locals || requestEvent.locals,
      request: server$.request || requestEvent.request,
    };

    await getSessionOrThrow(event);

    return getInvoice({ event, pageId: parsed.id });
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
    const parsed = await parseAsync(selectInvoicesArgs(), args);

    const requestEvent = useRequest();

    const event = {
      clientAddress: server$.clientAddress || requestEvent.clientAddress,
      env: server$.env || requestEvent.env,
      fetch: server$.fetch || requestEvent.fetch,
      locals: server$.locals || requestEvent.locals,
      request: server$.request || requestEvent.request,
    };

    await getSessionOrThrow(event);

    const collection = await queryInvoices({
      event,
      startCursor: parsed.startCursor,
    });

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
  return merge([invoiceSchema(), object({ id: string() })]);
};

export const updateInvoiceServerMutation = server$(
  async (data: Input<ReturnType<typeof updateInvoiceArgs>>) => {
    const parsed = await parseAsync(updateInvoiceArgs(), data);

    const event = {
      clientAddress: server$.clientAddress,
      env: server$.env,
      fetch: server$.fetch,
      locals: server$.locals,
      request: server$.request,
    };

    await getSessionOrThrow(event);

    await updateInvoice({ event, invoice: parsed });

    return parsed;
  },
);

export const insertInvoiceServerMutation = server$(
  async (data: Input<ReturnType<typeof invoiceSchema>>) => {
    const parsed = await parseAsync(invoiceSchema(), data);

    const event = {
      clientAddress: server$.clientAddress,
      env: server$.env,
      fetch: server$.fetch,
      locals: server$.locals,
      request: server$.request,
    };

    await getSessionOrThrow(event);

    return createInvoice({ event, invoice: parsed });
  },
);

const deleteSchemaArgs = () => {
  return object({ id: coerce(number(), Number) });
};

export const deleteInvoiceServerMutation = server$(
  async (data: Input<ReturnType<typeof deleteSchemaArgs>>) => {
    const parsed = await parseAsync(deleteSchemaArgs(), data);

    const event = {
      clientAddress: server$.clientAddress,
      env: server$.env,
      fetch: server$.fetch,
      locals: server$.locals,
      request: server$.request,
    };

    await getSessionOrThrow(event);

    await deleteInvoice({ event, id: parsed.id });

    return parsed.id;
  },
);
