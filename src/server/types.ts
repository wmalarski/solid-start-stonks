/* eslint-disable @typescript-eslint/naming-convention */
export type Invoice = {
  buyerAddress1: string;
  buyerAddress2: string;
  buyerName: string;
  buyerNip: string;
  city: string;
  date: string;
  id: string;
  invoiceTitle: string;
  notes: string;
  paymentAccount: string;
  paymentBank: string;
  paymentMethod: "cash" | "transfer";
  sellerAddress1: string;
  sellerAddress2: string;
  sellerName: string;
  sellerNip: string;
  serviceCount: number;
  servicePayed: number;
  servicePrice: number;
  serviceTitle: string;
  serviceUnit: string;
};

export type ResourceResult<TData> =
  | {
      kind: "error";
      message: string;
    }
  | {
      kind: "success";
      data: TData;
    };
