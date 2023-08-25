import type { Invoice } from "~/db/invoices";

export const mockId = (): string => {
  return `${Math.floor(Math.random() * 1e16)}`;
};

export const mockInvoice = (update: Partial<Invoice> = {}): Invoice => {
  return {
    buyer_address_1: "string",
    buyer_address_2: "string",
    buyer_name: "string",
    buyer_nip: "string",
    city: "string",
    created_at: new Date(),
    date: new Date(),
    id: "string",
    invoice_title: "string",
    notes: "notes",
    payment_account: "string",
    payment_bank: "string",
    payment_method: "cash",
    seller_address1: "string",
    seller_address2: "string",
    seller_name: "string",
    seller_nip: "string",
    service_count: 100,
    service_payed: 50,
    service_price: 50,
    service_title: "string",
    service_unit: "string",
    updated_at: new Date(),
    userId: "",
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
