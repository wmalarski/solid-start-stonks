CREATE TABLE `accounts` (
	`access_token` text,
	`createdAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	`expires_in` int,
	`id` varchar(191) PRIMARY KEY NOT NULL,
	`id_token` text,
	`provider` varchar(191) NOT NULL,
	`providerAccountId` varchar(191) NOT NULL,
	`refresh_token` text,
	`refresh_token_expires_in` int,
	`scope` varchar(191),
	`token_type` varchar(191),
	`type` varchar(191) NOT NULL,
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	`userId` varchar(191) NOT NULL
);

CREATE TABLE `invoices` (
	`buyer_address_1` text NOT NULL,
	`buyer_address_2` text NOT NULL,
	`buyer_name` text NOT NULL,
	`buyer_nip` text NOT NULL,
	`city` text NOT NULL,
	`created_at` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	`updated_at` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	`id` varchar(191) PRIMARY KEY NOT NULL,
	`invoice_title` text NOT NULL,
	`notes` text NOT NULL,
	`payment_account` text NOT NULL,
	`payment_bank` text NOT NULL,
	`payment_method` text NOT NULL,
	`seller_address1` text NOT NULL,
	`seller_address2` text NOT NULL,
	`seller_name` text NOT NULL,
	`seller_nip` text NOT NULL,
	`service_count` int NOT NULL,
	`service_payed` int NOT NULL,
	`service_price` int NOT NULL,
	`service_title` text NOT NULL,
	`service_unit` text NOT NULL,
	`userId` varchar(191) NOT NULL
);

CREATE TABLE `sessions` (
	`created_at` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	`expires` datetime NOT NULL,
	`id` varchar(191) PRIMARY KEY NOT NULL,
	`sessionToken` varchar(191) NOT NULL,
	`updated_at` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	`userId` varchar(191) NOT NULL
);

CREATE TABLE `users` (
	`created_at` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	`email` varchar(191) NOT NULL,
	`emailVerified` timestamp,
	`id` varchar(191) PRIMARY KEY NOT NULL,
	`image` varchar(191),
	`name` varchar(191),
	`updated_at` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE `verification_tokens` (
	`created_at` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	`expires` datetime NOT NULL,
	`identifier` varchar(191) PRIMARY KEY NOT NULL,
	`token` varchar(191) NOT NULL,
	`updated_at` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP
);

CREATE UNIQUE INDEX `accounts__provider__providerAccountId__idx` ON `accounts` (`provider`,`providerAccountId`);
CREATE INDEX `accounts__userId__idx` ON `accounts` (`userId`);
CREATE UNIQUE INDEX `invoices__user_id__idx` ON `invoices` (`userId`);
CREATE UNIQUE INDEX `sessions__sessionToken__idx` ON `sessions` (`sessionToken`);
CREATE INDEX `sessions__userId__idx` ON `sessions` (`userId`);
CREATE UNIQUE INDEX `users__email__idx` ON `users` (`email`);
CREATE UNIQUE INDEX `verification_tokens__token__idx` ON `verification_tokens` (`token`);