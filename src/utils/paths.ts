export const paths = {
  addInvoice: "/dashboard/add",
  callback: "/auth/callback",
  copyInvoice: (id: string) => `/dashboard/invoice/${id}/copy`,
  editInvoice: (id: string) => `/dashboard/invoice/${id}/edit`,
  index: "/",
  invoice: (id: string) => `/dashboard/invoice/${id}`,
  invoices: (page = 0) =>
    `/dashboard/invoices?${new URLSearchParams({ page: `${page}` })}`,
  login: "/auth/login",
  notFound: "/404",
};
