import { createId } from "@paralleldrive/cuid2";
import { InferModel, sql } from "drizzle-orm";
import { and, eq } from "drizzle-orm/expressions";
import { db } from "./db";
import { invoices } from "./schema";

export type Invoice = InferModel<typeof invoices>;

export type SelectInvoiceByIdArgs = {
  id: string;
  userId: string;
};

export const selectInvoiceById = async (args: SelectInvoiceByIdArgs) => {
  const collection = await db
    .select()
    .from(invoices)
    .where(and(eq(invoices.id, args.id), eq(invoices.user_id, args.userId)))
    .limit(1);

  return collection.at(0);
};

export type SelectInvoicesByUserIdArgs = {
  userId: string;
  limit: number;
  offset: number;
};

export const selectInvoicesByUserId = (args: SelectInvoicesByUserIdArgs) => {
  return db
    .select()
    .from(invoices)
    .where(eq(invoices.user_id, args.userId))
    .offset(args.offset)
    .limit(args.limit);
};

export type CountInvoicesByUserIdArgs = {
  userId: string;
};

export const countInvoicesByUserId = async (
  args: CountInvoicesByUserIdArgs
) => {
  const counts = await db
    .select({ count: sql<number>`count(${invoices.user_id})` })
    .from(invoices)
    .where(eq(invoices.user_id, args.userId))
    .groupBy(invoices.user_id);

  return counts.at(0)?.count || 0;
};

export type InsertInvoiceArgs = Omit<
  InferModel<typeof invoices, "insert">,
  "id"
>;

export const insertInvoice = (args: InsertInvoiceArgs) => {
  return db
    .insert(invoices)
    .values({ ...args, id: createId() })
    .execute();
};

export type UpdateInvoiceArgs = {
  id: string;
  userId: string;
  change: Omit<Partial<Invoice>, "id" | "user_id">;
};

export const updateInvoice = (args: UpdateInvoiceArgs) => {
  return db
    .update(invoices)
    .set(args.change)
    .where(and(eq(invoices.id, args.id), eq(invoices.user_id, args.userId)))
    .execute();
};

export type DeleteInvoiceArgs = {
  id: string;
  userId: string;
};

export const deleteInvoice = (args: DeleteInvoiceArgs) => {
  return db
    .delete(invoices)
    .where(and(eq(invoices.id, args.id), eq(invoices.user_id, args.userId)))
    .execute();
};
