export const paths = {
  addInvoice: "/dashboard/add",
  callback: "/auth/callback",
  copyInvoice: (id: string) => `/dashboard/invoice/${id}/copy`,
  editInvoice: (id: string) => `/dashboard/invoice/${id}/edit`,
  index: "/",
  invoice: (id: string) => `/dashboard/invoice/${id}`,
  invoices: "/dashboard/invoices",
  login: "/auth/login",
  notFound: "/404",
};
