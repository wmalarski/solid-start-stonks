import { createI18nContext } from "@solid-primitives/i18n";

const dict = {
  pl: {
    invoice: {
      account: "Nr konta:",
      bankName: "Nazwa Banku:",
      buyer: "Nabywca",
      cash: "Gotówka",
      count: "Ilość",
      dueDate: "Termin płatności:",
      header: "{{city}}, dnia: {{date}}",
      index: "Lp.",
      leftToPay: "Pozostało do zapłaty:",
      longToPay: "(słownie: {{sum}} 00/100)",
      nip: "NIP: {{nip}}",
      notes: "Uwagi:",
      payed: "Zapłacono:",
      paymentMethod: "Sposób płatności:",
      price: "Cena jednostkowa PLN",
      seller: "Sprzedawca",
      serviceName: "Nazwa towaru lub usługi",
      sum: "Wartość towaru (usługi) PLN",
      title: "FAKTURA Nr {{title}}",
      toPay: "Do zapłaty:",
      transfer: "Przelew",
      unit: "JM",
    },
    invoices: {
      header: "Invoices",
      more: "Więcej",
    },
    magicLink: {
      button: "Send magic link to your email!",
      header: "Send magic link",
      subheader:
        "To log in, or register. Use the form below to get a magic link to your email.",
      success: "An email should arrive in your inbox shortly",
    },
    notFound: {
      header: "Not found",
      home: "Faktury",
    },
    sidebar: {
      home: "Faktury",
      logout: "Wyloguj",
    },
  },
};

export const i18n = createI18nContext(dict, "pl");
