import type { Invoice } from "~/server/invoices/api";

export const mockId = (): string => {
  return `${Math.floor(Math.random() * 1e16)}`;
};

export const mockInvoice = (update: Partial<Invoice> = {}): Invoice => {
  return {
    buyerAddress1: "string",
    buyerAddress2: "string",
    buyerName: "string",
    buyerNip: "string",
    city: "string",
    date: new Date().toDateString(),
    id: "1",
    invoiceTitle: "string",
    notes: "notes",
    paymentAccount: "string",
    paymentBank: "string",
    paymentMethod: "cash",
    sellerAddress1: "string",
    sellerAddress2: "string",
    sellerName: "string",
    sellerNip: "string",
    serviceCount: 100,
    servicePayed: 50,
    servicePrice: 50,
    serviceTitle: "string",
    serviceUnit: "string",
    ...update,
  };
};

export const mockInvoices = (count: number): Invoice[] => {
  return new Array(count).fill(0).map(() =>
    mockInvoice({
      id: mockId(),
    }),
  );
};
