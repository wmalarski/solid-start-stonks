import type { FetchEvent } from "solid-start";
import {
  databaseResponseToProperties,
  dateToPlainDate,
  numberToPlainNumber,
  queryNotionDatabase,
  richTextToPlainText,
  titleToPlainText,
  uniqueIdToPlainText,
  type QueryDatabaseResult,
} from "../notion";

const databaseResponseToInvoice = (result: QueryDatabaseResult) => {
  const properties = databaseResponseToProperties(result);

  if (!properties) {
    return null;
  }

  try {
    return {
      buyerAddress1: titleToPlainText(properties.buyerAddress1),
      buyerAddress2: richTextToPlainText(properties.buyerAddress2),
      buyerName: richTextToPlainText(properties.buyerName),
      buyerNip: richTextToPlainText(properties.buyerNip),
      city: richTextToPlainText(properties.city),
      date: dateToPlainDate(properties.date),
      id: uniqueIdToPlainText(properties.ID),
      invoiceTitle: richTextToPlainText(properties.invoiceTitle),
      notes: richTextToPlainText(properties.notes),
      paymentAccount: richTextToPlainText(properties.paymentAccount),
      paymentBank: richTextToPlainText(properties.paymentBank),
      paymentMethod: richTextToPlainText(properties.paymentMethod),
      sellerAddress1: richTextToPlainText(properties.sellerAddress1),
      sellerAddress2: richTextToPlainText(properties.sellerAddress2),
      sellerName: richTextToPlainText(properties.sellerName),
      sellerNip: richTextToPlainText(properties.sellerNip),
      serviceCount: numberToPlainNumber(properties.serviceCount),
      servicePayed: numberToPlainNumber(properties.servicePayed),
      servicePrice: numberToPlainNumber(properties.servicePrice),
      serviceTitle: richTextToPlainText(properties.serviceTitle),
      serviceUnit: richTextToPlainText(properties.serviceUnit),
    };
  } catch (err) {
    return null;
  }
};

export type Invoice = NonNullable<ReturnType<typeof databaseResponseToInvoice>>;

type QueryNotionInvoicesArgs = {
  event: FetchEvent;
  startCursor?: string;
};

export const queryNotionInvoices = async ({
  event,
  startCursor,
}: QueryNotionInvoicesArgs) => {
  const response = await queryNotionDatabase({
    event,
    page_size: 10,
    start_cursor: startCursor,
  });

  const results: Invoice[] = [];

  response.results.forEach((entry) => {
    const invoice = databaseResponseToInvoice(entry);
    if (invoice) {
      results.push(invoice);
    }
  });

  return { ...response, results };
};

export type QueryNotionInvoicesResponse = Awaited<
  ReturnType<typeof queryNotionInvoices>
>;

type QueryNotionInvoiceArgs = {
  event: FetchEvent;
  id: number;
};

export const queryNotionInvoice = async ({
  event,
  id,
}: QueryNotionInvoiceArgs) => {
  const response = await queryNotionDatabase({
    event,
    filter: { number: { equals: id }, property: "ID" },
    page_size: 1,
  });

  const result = response.results.at(0);

  if (!result) {
    return null;
  }

  return databaseResponseToInvoice(result);
};

type InsertNotionInvoiceArgs = {
  event: FetchEvent;
  id: number;
};

export const insertNotionInvoice = async ({
  event,
  id,
}: QueryNotionInvoiceArgs) => {
  const response = await queryNotionDatabase({
    event,
    filter: { number: { equals: id }, property: "ID" },
    page_size: 1,
  });

  const result = response.results.at(0);

  if (!result) {
    return null;
  }

  return databaseResponseToInvoice(result);
};
