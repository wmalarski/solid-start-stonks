import server$, { createServerAction$, redirect } from "solid-start/server";
import { z } from "zod";
import {
  countInvoicesByUserId,
  deleteInvoice,
  insertInvoice,
  selectInvoiceById,
  selectInvoicesByUserId,
  updateInvoice,
} from "~/db/invoices";
import { zodFormParse } from "~/server/utils";
import { paths } from "~/utils/paths";
import { getUser } from "./auth";

const selectInvoiceArgs = z.object({
  id: z.string(),
});

export const selectInvoiceKey = (args: z.infer<typeof selectInvoiceArgs>) => {
  return ["selectInvoice", args] as const;
};

export const selectInvoiceServerQuery = server$(
  async ([, args]: ReturnType<typeof selectInvoiceKey>) => {
    const { id } = selectInvoiceArgs.parse(args);

    const user = await getUser(server$.request);

    const invoice = await selectInvoiceById({ id, userId: user.id });

    if (!invoice) {
      throw redirect(paths.notFound);
    }

    return invoice;
  }
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
    const { limit, offset } = selectInvoicesArgs.parse(args);

    const user = await getUser(server$.request);

    const [collection, total] = await Promise.all([
      selectInvoicesByUserId({ limit, offset, userId: user.id }),
      countInvoicesByUserId({ userId: user.id }),
    ]);

    return { collection, total };
  }
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
  z.object({ id: z.string() })
);

export const updateInvoiceServerMutation = server$(
  async (data: z.infer<typeof updateInvoiceArgs>) => {
    const parsed = updateInvoiceArgs.parse(data);

    const user = await getUser(server$.request);

    await updateInvoice({
      change: parsed,
      id: parsed.id,
      userId: user.id,
    });

    return parsed;
  }
);

export const createUpdateInvoiceServerAction = () => {
  return createServerAction$(async (form: FormData, event) => {
    const user = await getUser(event.request);

    const idSchema = z.object({ id: z.string() });
    const schema = z.intersection(invoiceSchema.partial(), idSchema);

    const parsed = await zodFormParse({ form, schema });
    const invoice = await updateInvoice({
      change: parsed,
      id: parsed.id,
      userId: user.id,
    });

    return redirect(invoice ? paths.invoice(parsed.id) : paths.notFound);
  });
};

export const insertInvoiceServerMutation = server$(
  async (data: z.infer<typeof invoiceSchema>) => {
    const parsed = invoiceSchema.parse(data);

    const user = await getUser(server$.request);

    const invoice = await insertInvoice({ ...parsed, userId: user.id });

    return invoice;
  }
);

export const createInsertInvoiceServerAction = () => {
  return createServerAction$(async (form: FormData, event) => {
    const user = await getUser(event.request);

    const parsed = await zodFormParse({ form, schema: invoiceSchema });
    const invoice = await insertInvoice({ ...parsed, userId: user.id });

    return redirect(paths.invoice(invoice.id));
  });
};

const deleteSchemaArgs = z.object({ id: z.string() });

export const deleteInvoiceServerMutation = server$(
  async (data: z.infer<typeof deleteSchemaArgs>) => {
    const parsed = deleteSchemaArgs.parse(data);

    const user = await getUser(server$.request);

    await deleteInvoice({ id: parsed.id, userId: user.id });

    return parsed.id;
  }
);

export const createDeleteInvoiceServerAction = () => {
  return createServerAction$(async (form: FormData, event) => {
    const user = await getUser(event.request);

    const schema = z.object({ id: z.string() });
    const data = await zodFormParse({ form, schema });
    await deleteInvoice({ id: data.id, userId: user.id });

    return redirect(paths.invoices());
  });
};
