/* eslint-disable @typescript-eslint/naming-convention */
import { z } from "zod";

export const UpdateInvoice = z.object({
  buyerAddress1: z.string().optional(),
  buyerAddress2: z.string().optional(),
  buyerName: z.string().optional(),
  buyerNip: z.string().optional(),
  city: z.string().optional(),
  date: z.string().optional(),
  id: z.string(),
  invoiceTitle: z.string().optional(),
  notes: z.string().optional(),
  paymentAccount: z.string().optional(),
  paymentBank: z.string().optional(),
  paymentMethod: z.union([z.literal("cash"), z.literal("transfer")]).optional(),
  sellerAddress1: z.string().optional(),
  sellerAddress2: z.string().optional(),
  sellerName: z.string().optional(),
  sellerNip: z.string().optional(),
  serviceCount: z.number().min(0).optional(),
  servicePayed: z.number().min(0).optional(),
  servicePrice: z.number().min(0).optional(),
  serviceTitle: z.string().optional(),
  serviceUnit: z.string().optional(),
});

export type UpdateInvoice = z.infer<typeof UpdateInvoice>;

export const Invoice = z.object({
  buyerAddress1: z.string(),
  buyerAddress2: z.string(),
  buyerName: z.string(),
  buyerNip: z.string(),
  city: z.string(),
  date: z.string(),
  id: z.string(),
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
