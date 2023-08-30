import type { FetchEvent } from "solid-start";
import {
  createNotionDatabase,
  databaseResponseToProperties,
  dateToPlainDate,
  numberToPlainNumber,
  plainDateToDate,
  plainNumberToNumber,
  plainTextToRichText,
  plainTextToTitle,
  queryNotionDatabase,
  richTextToPlainText,
  titleToPlainText,
  uniqueIdToPlainText,
  updateNotionDatabase,
  type CreateProperties,
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
    // eslint-disable-next-line no-console
    console.error("[INVOICE PARSE ERROR]", err);
    return null;
  }
};

export type Invoice = NonNullable<ReturnType<typeof databaseResponseToInvoice>>;

const invoiceToDatabaseProperties = (
  invoice: Omit<Invoice, "id">,
): CreateProperties => {
  return {
    buyerAddress1: plainTextToTitle(invoice.buyerAddress1),
    buyerAddress2: plainTextToRichText(invoice.buyerAddress2),
    buyerName: plainTextToRichText(invoice.buyerName),
    buyerNip: plainTextToRichText(invoice.buyerNip),
    city: plainTextToRichText(invoice.city),
    date: plainDateToDate(invoice.date),
    invoiceTitle: plainTextToRichText(invoice.invoiceTitle),
    notes: plainTextToRichText(invoice.notes),
    paymentAccount: plainTextToRichText(invoice.paymentAccount),
    paymentBank: plainTextToRichText(invoice.paymentBank),
    paymentMethod: plainTextToRichText(invoice.paymentMethod),
    sellerAddress1: plainTextToRichText(invoice.sellerAddress1),
    sellerAddress2: plainTextToRichText(invoice.sellerAddress2),
    sellerName: plainTextToRichText(invoice.sellerName),
    sellerNip: plainTextToRichText(invoice.sellerNip),
    serviceCount: plainNumberToNumber(invoice.serviceCount),
    servicePayed: plainNumberToNumber(invoice.servicePayed),
    servicePrice: plainNumberToNumber(invoice.servicePrice),
    serviceTitle: plainTextToRichText(invoice.serviceTitle),
    serviceUnit: plainTextToRichText(invoice.serviceUnit),
  };
};

type QueryInvoicesArgs = {
  event: FetchEvent;
  startCursor?: string;
};

export const queryInvoices = async ({
  event,
  startCursor,
}: QueryInvoicesArgs) => {
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

export type QueryInvoicesResponse = Awaited<ReturnType<typeof queryInvoices>>;

type QueryInvoiceArgs = {
  event: FetchEvent;
  id: number;
};

export const queryInvoice = async ({ event, id }: QueryInvoiceArgs) => {
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

type CreateInvoiceArgs = {
  event: FetchEvent;
  invoice: Omit<Invoice, "id">;
};

export const createInvoice = async ({ event, invoice }: CreateInvoiceArgs) => {
  const properties = invoiceToDatabaseProperties(invoice);

  const response = await createNotionDatabase({
    event,
    properties,
  });

  return response;
};

type UpdateInvoiceArgs = {
  event: FetchEvent;
  invoice: Invoice;
};

export const updateInvoice = async ({ event, invoice }: UpdateInvoiceArgs) => {
  const properties = invoiceToDatabaseProperties(invoice);

  console.log({ event });

  const response = await updateNotionDatabase({
    event,
    properties,
  });

  return response;
};

type DeleteInvoiceArgs = {
  event: FetchEvent;
  id: number;
};

export const deleteInvoice = async ({ event }: DeleteInvoiceArgs) => {
  // const properties = invoiceToDatabaseProperties(invoice);

  const response = await updateNotionDatabase({
    archived: true,
    event,
    // properties,
  });

  return response;
};
