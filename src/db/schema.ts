import {
  datetime,
  index,
  int,
  mysqlTable,
  text,
  timestamp,
  uniqueIndex,
  varchar,
} from "drizzle-orm/mysql-core";

export const accounts = mysqlTable(
  "accounts",
  {
    access_token: text("access_token"),
    createdAt: timestamp("createdAt").defaultNow().onUpdateNow().notNull(),
    expires_in: int("expires_in"),
    id: varchar("id", { length: 191 }).primaryKey().notNull(),
    id_token: text("id_token"),
    provider: varchar("provider", { length: 191 }).notNull(),
    providerAccountId: varchar("providerAccountId", { length: 191 }).notNull(),
    refresh_token: text("refresh_token"),
    refresh_token_expires_in: int("refresh_token_expires_in"),
    scope: varchar("scope", { length: 191 }),
    token_type: varchar("token_type", { length: 191 }),
    type: varchar("type", { length: 191 }).notNull(),
    updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
    userId: varchar("userId", { length: 191 }).notNull(),
  },
  (account) => ({
    providerProviderAccountIdIndex: uniqueIndex(
      "accounts__provider__providerAccountId__idx"
    ).on(account.provider, account.providerAccountId),
    userIdIndex: index("accounts__userId__idx").on(account.userId),
  })
);

export const sessions = mysqlTable(
  "sessions",
  {
    created_at: timestamp("created_at").notNull().defaultNow().onUpdateNow(),
    expires: datetime("expires").notNull(),
    id: varchar("id", { length: 191 }).primaryKey().notNull(),
    sessionToken: varchar("sessionToken", { length: 191 }).notNull(),
    updated_at: timestamp("updated_at").notNull().defaultNow().onUpdateNow(),
    userId: varchar("userId", { length: 191 }).notNull(),
  },
  (session) => ({
    sessionTokenIndex: uniqueIndex("sessions__sessionToken__idx").on(
      session.sessionToken
    ),
    userIdIndex: index("sessions__userId__idx").on(session.userId),
  })
);

export const users = mysqlTable(
  "users",
  {
    created_at: timestamp("created_at").notNull().defaultNow().onUpdateNow(),
    email: varchar("email", { length: 191 }).notNull(),
    emailVerified: timestamp("emailVerified"),
    id: varchar("id", { length: 191 }).primaryKey().notNull(),
    image: varchar("image", { length: 191 }),
    name: varchar("name", { length: 191 }),
    updated_at: timestamp("updated_at").notNull().defaultNow().onUpdateNow(),
  },
  (user) => ({
    emailIndex: uniqueIndex("users__email__idx").on(user.email),
  })
);

export const verificationTokens = mysqlTable(
  "verification_tokens",
  {
    created_at: timestamp("created_at").notNull().defaultNow().onUpdateNow(),
    expires: datetime("expires").notNull(),
    identifier: varchar("identifier", { length: 191 }).primaryKey().notNull(),
    token: varchar("token", { length: 191 }).notNull(),
    updated_at: timestamp("updated_at").notNull().defaultNow().onUpdateNow(),
  },
  (verificationToken) => ({
    tokenIndex: uniqueIndex("verification_tokens__token__idx").on(
      verificationToken.token
    ),
  })
);

export const invoices = mysqlTable(
  "invoices",
  {
    buyer_address_1: text("buyer_address_1").notNull(),
    buyer_address_2: text("buyer_address_2").notNull(),
    buyer_name: text("buyer_name").notNull(),
    buyer_nip: text("buyer_nip").notNull(),
    city: text("city").notNull(),
    created_at: timestamp("created_at").notNull().defaultNow().onUpdateNow(),
    date: timestamp("updated_at").notNull(),
    id: varchar("id", { length: 191 }).primaryKey().notNull(),
    invoice_title: text("invoice_title").notNull(),
    notes: text("notes").notNull(),
    payment_account: text("payment_account").notNull(),
    payment_bank: text("payment_bank").notNull(),
    payment_method: text("payment_method").notNull(),
    seller_address1: text("seller_address1").notNull(),
    seller_address2: text("seller_address2").notNull(),
    seller_name: text("seller_name").notNull(),
    seller_nip: text("seller_nip").notNull(),
    service_count: int("service_count").notNull(),
    service_payed: int("service_payed").notNull(),
    service_price: int("service_price").notNull(),
    service_title: text("service_title").notNull(),
    service_unit: text("service_unit").notNull(),
    updated_at: timestamp("updated_at").notNull().defaultNow().onUpdateNow(),
    user_id: varchar("user_id", { length: 191 }).notNull(),
  },
  (invoice) => ({
    userIdIndex: uniqueIndex("invoices__user_id__idx").on(invoice.user_id),
  })
);
