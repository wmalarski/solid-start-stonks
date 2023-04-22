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

const selectInvoiceKeyArgsSchema = z.object({
  id: z.string(),
});

export const selectInvoiceKey = (
  args: z.infer<typeof selectInvoiceKeyArgsSchema>
) => {
  return ["selectInvoice", args] as const;
};

export const queryInvoice = server$(
  async ([, args]: ReturnType<typeof selectInvoiceKey>) => {
    const { id } = selectInvoiceKeyArgsSchema.parse(args);

    const user = await getUser(server$.request);

    const invoice = await selectInvoiceById({ id, userId: user.id });

    if (!invoice) {
      throw redirect(paths.notFound);
    }

    return invoice;
  }
);

const selectInvoicesKeyArgsSchema = z.object({
  limit: z.number(),
  offset: z.number(),
});

export const selectInvoicesKey = (
  args: z.infer<typeof selectInvoicesKeyArgsSchema>
) => {
  return ["selectInvoices", args] as const;
};

export const queryInvoices = server$(
  async ([, args]: ReturnType<typeof selectInvoicesKey>) => {
    const { limit, offset } = selectInvoicesKeyArgsSchema.parse(args);

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
  payment_method: z.union([z.literal("cash"), z.literal("transfer")]),
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

export const createInsertInvoiceServerAction = () => {
  return createServerAction$(async (form: FormData, event) => {
    const user = await getUser(event.request);

    const parsed = await zodFormParse({ form, schema: invoiceSchema });
    const invoice = await insertInvoice({ ...parsed, userId: user.id });

    return redirect(paths.invoice(invoice.id));
  });
};

export const createDeleteInvoiceServerAction = () => {
  return createServerAction$(async (form: FormData, event) => {
    const user = await getUser(event.request);

    const schema = z.object({ id: z.string() });
    const data = await zodFormParse({ form, schema });
    await deleteInvoice({ id: data.id, userId: user.id });

    return redirect(paths.invoices());
  });
};
