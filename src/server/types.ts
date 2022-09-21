/* eslint-disable @typescript-eslint/naming-convention */
import { z } from "zod";

const InvoiceBase = z.object({
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
  paymentMethod: z.union([z.literal("cash"), z.literal("transfer")]),
  sellerAddress1: z.string(),
  sellerAddress2: z.string(),
  sellerName: z.string(),
  sellerNip: z.string(),
  serviceCount: z.number().min(0),
  servicePayed: z.number().min(0),
  servicePrice: z.number().min(0),
  serviceTitle: z.string(),
  serviceUnit: z.string(),
});

export const UpdateInvoice = z.intersection(
  InvoiceBase.partial(),
  z.object({ id: z.string() })
);

export type UpdateInvoice = z.infer<typeof UpdateInvoice>;

export const InsertInvoice = InvoiceBase;

export type InsertInvoice = z.infer<typeof InsertInvoice>;

export const Invoice = z.intersection(
  InvoiceBase,
  z.object({ id: z.string() })
);

export type Invoice = z.infer<typeof Invoice>;

export type ResourceResult<TData> =
  | {
      kind: "error";
      message: string;
    }
  | {
      kind: "success";
      data: TData;
    };
