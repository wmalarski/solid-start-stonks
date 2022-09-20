export const paths = {
  addInvoice: "/dashboard/add",
  copyInvoice: (id: string) => `/dashboard/invoice/${id}/copy`,
  editInvoice: (id: string) => `/dashboard/invoice/${id}/edit`,
  index: "/",
  invoice: (id: string) => `/dashboard/invoice/${id}`,
  invoices: (page = 0) =>
    `/dashboard/invoices?${new URLSearchParams({
      page: `${page}`,
    })}`,
  login: "/login",
  notFound: "/notFound",
};
