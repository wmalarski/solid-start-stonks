import type { FetchEvent } from "solid-start";
import {
  createPage,
  databaseResponseToProperties,
  dateToPlainDate,
  getPage,
  numberToPlainNumber,
  plainDateToDate,
  plainNumberToNumber,
  plainTextToRichText,
  plainTextToTitle,
  queryDatabase,
  richTextToPlainText,
  titleToPlainText,
  updatePage,
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
      id: result.id,
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

export const invoiceToDatabaseProperties = (
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
  const response = await queryDatabase({
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

type GetInvoiceArgs = {
  event: FetchEvent;
  pageId: string;
};

export const getInvoice = async ({ event, pageId }: GetInvoiceArgs) => {
  const response = await getPage({
    event,
    page_id: pageId,
  });

  return databaseResponseToInvoice(response);
};

type CreateInvoiceArgs = {
  event: FetchEvent;
  invoice: Omit<Invoice, "id">;
};

export const createInvoice = ({ event, invoice }: CreateInvoiceArgs) => {
  const properties = invoiceToDatabaseProperties(invoice);

  return createPage({ event, properties });
};

type UpdateInvoiceArgs = {
  event: FetchEvent;
  invoice: Invoice;
};

export const updateInvoice = ({ event, invoice }: UpdateInvoiceArgs) => {
  const properties = invoiceToDatabaseProperties(invoice);

  return updatePage({ event, page_id: invoice.id, properties });
};

type DeleteInvoiceArgs = {
  event: FetchEvent;
  id: string;
};

export const deleteInvoice = ({ event, id }: DeleteInvoiceArgs) => {
  return updatePage({ archived: true, event, page_id: id });
};
