export const paths = {
  addInvoice: "/dashboard/add",
  callback: "/auth/callback",
  copyInvoice: (id: number) => `/dashboard/invoice/${id}/copy`,
  editInvoice: (id: number) => `/dashboard/invoice/${id}/edit`,
  index: "/",
  invoice: (id: number) => `/dashboard/invoice/${id}`,
  invoices: (page = 0) =>
    `/dashboard/invoices?${new URLSearchParams({ page: `${page}` })}`,
  login: "/auth/login",
  notFound: "/404",
};
