CREATE TABLE `account` (
	`id` text PRIMARY KEY NOT NULL,
	`account_id` text NOT NULL,
	`provider_id` text NOT NULL,
	`user_id` text NOT NULL,
	`access_token` text,
	`refresh_token` text,
	`id_token` text,
	`access_token_expires_at` integer,
	`refresh_token_expires_at` integer,
	`scope` text,
	`password` text,
	`created_at` integer,
	`updated_at` integer,
	FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `articles` (
	`id` text PRIMARY KEY NOT NULL,
	`title` text NOT NULL,
	`slug` text NOT NULL,
	`excerpt` text,
	`content` text NOT NULL,
	`featured_image` text,
	`category` text DEFAULT 'general' NOT NULL,
	`tags` text,
	`author` text,
	`published_date` integer,
	`active` integer DEFAULT false,
	`featured` integer DEFAULT false,
	`view_count` integer DEFAULT 0,
	`created_at` integer,
	`updated_at` integer
);
--> statement-breakpoint
CREATE UNIQUE INDEX `articles_slug_unique` ON `articles` (`slug`);--> statement-breakpoint
CREATE TABLE `crm_expenses` (
	`id` text PRIMARY KEY NOT NULL,
	`project_id` text NOT NULL,
	`title` text NOT NULL,
	`amount` integer NOT NULL,
	`category` text NOT NULL,
	`date` integer NOT NULL,
	`description` text,
	`receipt_url` text,
	`created_at` integer,
	FOREIGN KEY (`project_id`) REFERENCES `crm_projects`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `crm_invoices` (
	`id` text PRIMARY KEY NOT NULL,
	`project_id` text NOT NULL,
	`invoice_number` text NOT NULL,
	`amount` integer NOT NULL,
	`tax_rate` integer DEFAULT 0,
	`tax_amount` integer DEFAULT 0,
	`down_payment_rate` integer DEFAULT 0,
	`down_payment_amount` integer DEFAULT 0,
	`balance_amount` integer DEFAULT 0,
	`items` text,
	`due_date` integer NOT NULL,
	`status` text DEFAULT 'unpaid' NOT NULL,
	`pdf_url` text,
	`notes` text,
	`created_at` integer,
	FOREIGN KEY (`project_id`) REFERENCES `crm_projects`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE UNIQUE INDEX `crm_invoices_invoice_number_unique` ON `crm_invoices` (`invoice_number`);--> statement-breakpoint
CREATE TABLE `crm_leads` (
	`id` text PRIMARY KEY NOT NULL,
	`project_name` text NOT NULL,
	`client_name` text NOT NULL,
	`pic_client` text NOT NULL,
	`pic_phone` text,
	`pic_email` text,
	`quoted_value` integer,
	`quoted_items` text,
	`estimated_cost` integer,
	`estimated_cost_items` text,
	`estimated_profit` integer,
	`closing_deadline` integer,
	`status` text DEFAULT 'lead' NOT NULL,
	`proposal_url` text,
	`inquiry_url` text,
	`po_url` text,
	`notes` text,
	`created_at` integer,
	`updated_at` integer
);
--> statement-breakpoint
CREATE TABLE `crm_payments` (
	`id` text PRIMARY KEY NOT NULL,
	`invoice_id` text NOT NULL,
	`amount` integer NOT NULL,
	`payment_date` integer NOT NULL,
	`method` text,
	`proof_url` text,
	`status` text DEFAULT 'pending' NOT NULL,
	`verified_at` integer,
	`verified_by` text,
	`created_at` integer,
	FOREIGN KEY (`invoice_id`) REFERENCES `crm_invoices`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`verified_by`) REFERENCES `user`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `crm_project_tasks` (
	`id` text PRIMARY KEY NOT NULL,
	`project_id` text NOT NULL,
	`title` text NOT NULL,
	`description` text,
	`status` text DEFAULT 'pending' NOT NULL,
	`priority` text DEFAULT 'medium',
	`due_date` integer,
	`assigned_to` text,
	`created_at` integer,
	`updated_at` integer,
	FOREIGN KEY (`project_id`) REFERENCES `crm_projects`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `crm_projects` (
	`id` text PRIMARY KEY NOT NULL,
	`lead_id` text,
	`name` text NOT NULL,
	`client_name` text,
	`pic_client` text,
	`pic_phone` text,
	`type` text NOT NULL,
	`status` text DEFAULT 'on_going' NOT NULL,
	`start_date` integer,
	`end_date` integer,
	`contract_value` integer,
	`actual_cost` integer DEFAULT 0,
	`progress` integer DEFAULT 0,
	`created_at` integer,
	FOREIGN KEY (`lead_id`) REFERENCES `crm_leads`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `crm_reminders` (
	`id` text PRIMARY KEY NOT NULL,
	`lead_id` text NOT NULL,
	`message` text NOT NULL,
	`remind_at` integer NOT NULL,
	`is_sent` integer DEFAULT false,
	`created_at` integer,
	FOREIGN KEY (`lead_id`) REFERENCES `crm_leads`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `crm_vendors` (
	`id` text PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`category` text,
	`contact_person` text,
	`email` text,
	`phone` text,
	`address` text,
	`rating` integer,
	`created_at` integer
);
--> statement-breakpoint
CREATE TABLE `faqs` (
	`id` text PRIMARY KEY NOT NULL,
	`question` text NOT NULL,
	`answer` text NOT NULL,
	`category` text DEFAULT 'general' NOT NULL,
	`order` integer DEFAULT 0,
	`active` integer DEFAULT true,
	`created_at` integer,
	`updated_at` integer
);
--> statement-breakpoint
CREATE TABLE `inquiries` (
	`id` text PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`email` text NOT NULL,
	`phone` text,
	`company` text,
	`subject` text,
	`message` text NOT NULL,
	`status` text DEFAULT 'new',
	`created_at` integer
);
--> statement-breakpoint
CREATE TABLE `products` (
	`id` text PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`category` text NOT NULL,
	`description` text NOT NULL,
	`features` text,
	`image_url` text,
	`area` text,
	`created_at` integer,
	`updated_at` integer
);
--> statement-breakpoint
CREATE TABLE `projects` (
	`id` text PRIMARY KEY NOT NULL,
	`title` text NOT NULL,
	`category` text NOT NULL,
	`description` text NOT NULL,
	`client` text,
	`year` text,
	`image_url` text,
	`gallery` text,
	`scope` text,
	`created_at` integer,
	`updated_at` integer
);
--> statement-breakpoint
CREATE TABLE `resources` (
	`id` text PRIMARY KEY NOT NULL,
	`title` text NOT NULL,
	`type` text NOT NULL,
	`category` text NOT NULL,
	`file_url` text NOT NULL,
	`created_at` integer,
	`updated_at` integer
);
--> statement-breakpoint
CREATE TABLE `session` (
	`id` text PRIMARY KEY NOT NULL,
	`expires_at` integer NOT NULL,
	`token` text NOT NULL,
	`created_at` integer,
	`updated_at` integer,
	`ip_address` text,
	`user_agent` text,
	`user_id` text NOT NULL,
	`impersonated_by` text,
	FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE UNIQUE INDEX `session_token_unique` ON `session` (`token`);--> statement-breakpoint
CREATE TABLE `user` (
	`id` text PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`email` text NOT NULL,
	`email_verified` integer DEFAULT false,
	`image` text,
	`role` text DEFAULT 'user',
	`banned` integer DEFAULT false,
	`ban_reason` text,
	`ban_expires` integer,
	`created_at` integer,
	`updated_at` integer
);
--> statement-breakpoint
CREATE UNIQUE INDEX `user_email_unique` ON `user` (`email`);--> statement-breakpoint
CREATE TABLE `verification` (
	`id` text PRIMARY KEY NOT NULL,
	`identifier` text NOT NULL,
	`value` text NOT NULL,
	`expires_at` integer NOT NULL,
	`created_at` integer,
	`updated_at` integer
);
