import { createI18nContext } from "@solid-primitives/i18n";

const dict = {
  pl: {
    addInvoice: {
      header: "Dodaj fakture",
    },
    copyInvoice: {
      header: "Kopiuj fakture",
    },
    editInvoice: {
      header: "Edytuj fakture",
    },
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
    invoiceForm: {
      buyer: "Kupujący",
      buyerAddress1: "Adres 1",
      buyerAddress2: "Adres 2",
      buyerName: "Nazwa",
      buyerNip: "Nip",
      cancel: "Anuluj",
      city: "Miasto:",
      date: "Data",
      general: "Faktura",
      invoiceTitle: "Tytuł",
      notes: "Notatki",
      payment: "Płatność",
      paymentAccount: "Konto",
      paymentBank: "Bank",
      save: "Zapisz",
      seller: "Sprzedający",
      sellerAddress1: "Adres 1",
      sellerAddress2: "Adres 2",
      sellerName: "Nazwa",
      sellerNip: "Nip",
      service: "Usługa",
      serviceCount: "Liczba",
      servicePrice: "Cena",
      serviceTitle: "Tytuł",
      serviceUnit: "Jednostka",
    },
    invoices: {
      header: "Faktury",
      more: "Więcej",
    },
    loading: "Loading",
    login: {
      button: "Login with Google",
      header: "Login",
      subheader: "To log in, or register. Login with provider.",
    },
    notFound: {
      header: "Not found",
      home: "Faktury",
    },
    sidebar: {
      home: "Faktury",
      logout: "Wyloguj",
    },
    topbar: {
      addInvoice: "Dodaj",
      copyInvoice: "Kopiuj",
      editInvoice: "Edytuj",
      home: "Faktury",
      removeInvoice: "Usuń",
    },
  },
};

export const i18n = createI18nContext(dict, "pl");
