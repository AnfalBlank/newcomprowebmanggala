import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";
import { relations } from "drizzle-orm";

// Better Auth tables with admin plugin support
// ... (omitting unchanged user, session, account, verification for brevity, but they stay)
export const user = sqliteTable("user", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  emailVerified: integer("email_verified", { mode: "boolean" }).default(false),
  image: text("image"),
  role: text("role").default("user"),
  banned: integer("banned", { mode: "boolean" }).default(false),
  banReason: text("ban_reason"),
  banExpires: integer("ban_expires", { mode: "timestamp" }),
  createdAt: integer("created_at", { mode: "timestamp" }).$defaultFn(() => new Date()),
  updatedAt: integer("updated_at", { mode: "timestamp" }).$defaultFn(() => new Date()),
});

export const session = sqliteTable("session", {
  id: text("id").primaryKey(),
  expiresAt: integer("expires_at", { mode: "timestamp" }).notNull(),
  token: text("token").notNull().unique(),
  createdAt: integer("created_at", { mode: "timestamp" }).$defaultFn(() => new Date()),
  updatedAt: integer("updated_at", { mode: "timestamp" }).$defaultFn(() => new Date()),
  ipAddress: text("ip_address"),
  userAgent: text("user_agent"),
  userId: text("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  impersonatedBy: text("impersonated_by"),
});

export const account = sqliteTable("account", {
  id: text("id").primaryKey(),
  accountId: text("account_id").notNull(),
  providerId: text("provider_id").notNull(),
  userId: text("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  accessToken: text("access_token"),
  refreshToken: text("refresh_token"),
  idToken: text("id_token"),
  accessTokenExpiresAt: integer("access_token_expires_at", { mode: "timestamp" }),
  refreshTokenExpiresAt: integer("refresh_token_expires_at", { mode: "timestamp" }),
  scope: text("scope"),
  password: text("password"),
  createdAt: integer("created_at", { mode: "timestamp" }).$defaultFn(() => new Date()),
  updatedAt: integer("updated_at", { mode: "timestamp" }).$defaultFn(() => new Date()),
});

export const verification = sqliteTable("verification", {
  id: text("id").primaryKey(),
  identifier: text("identifier").notNull(),
  value: text("value").notNull(),
  expiresAt: integer("expires_at", { mode: "timestamp" }).notNull(),
  createdAt: integer("created_at", { mode: "timestamp" }).$defaultFn(() => new Date()),
  updatedAt: integer("updated_at", { mode: "timestamp" }).$defaultFn(() => new Date()),
});

// App specific tables

export const projects = sqliteTable("projects", {
  id: text("id").primaryKey(),
  title: text("title").notNull(),
  category: text("category").notNull(),
  description: text("description").notNull(),
  client: text("client"),
  year: text("year"),
  imageUrl: text("image_url"),
  gallery: text("gallery"), // Store as JSON array of URLs
  scope: text("scope"),
  createdAt: integer("created_at", { mode: "timestamp" }).$defaultFn(() => new Date()),
  updatedAt: integer("updated_at", { mode: "timestamp" }).$defaultFn(() => new Date()),
});

export const products = sqliteTable("products", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  category: text("category").notNull(),
  description: text("description").notNull(),
  features: text("features"),
  imageUrl: text("image_url"),
  area: text("area"),
  createdAt: integer("created_at", { mode: "timestamp" }).$defaultFn(() => new Date()),
  updatedAt: integer("updated_at", { mode: "timestamp" }).$defaultFn(() => new Date()),
});

export const inquiries = sqliteTable("inquiries", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  phone: text("phone"),
  company: text("company"),
  subject: text("subject"),
  message: text("message").notNull(),
  status: text("status").default("new"),
  createdAt: integer("created_at", { mode: "timestamp" }).$defaultFn(() => new Date()),
});

export const resources = sqliteTable("resources", {
  id: text("id").primaryKey(),
  title: text("title").notNull(),
  type: text("type").notNull(),
  category: text("category").notNull(),
  fileUrl: text("file_url").notNull(),
  createdAt: integer("created_at", { mode: "timestamp" }).$defaultFn(() => new Date()),
  updatedAt: integer("updated_at", { mode: "timestamp" }).$defaultFn(() => new Date()),
});

export const faqs = sqliteTable("faqs", {
  id: text("id").primaryKey(),
  question: text("question").notNull(),
  answer: text("answer").notNull(),
  category: text("category").notNull().default("general"),
  order: integer("order").default(0),
  active: integer("active", { mode: "boolean" }).default(true),
  createdAt: integer("created_at", { mode: "timestamp" }).$defaultFn(() => new Date()),
  updatedAt: integer("updated_at", { mode: "timestamp" }).$defaultFn(() => new Date()),
});

export const articles = sqliteTable("articles", {
  id: text("id").primaryKey(),
  title: text("title").notNull(),
  slug: text("slug").notNull().unique(),
  excerpt: text("excerpt"),
  content: text("content").notNull(),
  featuredImage: text("featured_image"),
  category: text("category").notNull().default("general"),
  tags: text("tags"),
  author: text("author"),
  publishedDate: integer("published_date", { mode: "timestamp" }),
  active: integer("active", { mode: "boolean" }).default(false),
  featured: integer("featured", { mode: "boolean" }).default(false),
  viewCount: integer("view_count").default(0),
  createdAt: integer("created_at", { mode: "timestamp" }).$defaultFn(() => new Date()),
  updatedAt: integer("updated_at", { mode: "timestamp" }).$defaultFn(() => new Date()),
});


// CRM Module Tables

export const crmLeads = sqliteTable("crm_leads", {
  id: text("id").primaryKey(),
  projectName: text("project_name").notNull(),
  clientName: text("client_name").notNull(),
  picClient: text("pic_client").notNull(),
  picPhone: text("pic_phone"), // Added for WA notification
  picEmail: text("pic_email"), // Added for convenience
  quotedValue: integer("quoted_value"), // In IDR
  quotedItems: text("quoted_items"), // Store as JSON array of objects for Quotation
  estimatedCost: integer("estimated_cost"),
  estimatedCostItems: text("estimated_cost_items"), // Store as JSON array of objects for internal estimate
  estimatedProfit: integer("estimated_profit"),
  closingDeadline: integer("closing_deadline", { mode: "timestamp" }),
  status: text("status").notNull().default("lead"), // lead, survey, proposal, negotiation, po_spk, lost
  proposalUrl: text("proposal_url"),
  inquiryUrl: text("inquiry_url"),
  poUrl: text("po_url"),
  notes: text("notes"),
  createdAt: integer("created_at", { mode: "timestamp" }).$defaultFn(() => new Date()),
  updatedAt: integer("updated_at", { mode: "timestamp" }).$defaultFn(() => new Date()),
});

export const crmVendors = sqliteTable("crm_vendors", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  category: text("category"), // pengadaan, manage_service, etc.
  contactPerson: text("contact_person"),
  email: text("email"),
  phone: text("phone"),
  address: text("address"),
  rating: integer("rating"),
  createdAt: integer("created_at", { mode: "timestamp" }).$defaultFn(() => new Date()),
});

export const crmProjects = sqliteTable("crm_projects", {
  id: text("id").primaryKey(),
  leadId: text("lead_id").references(() => crmLeads.id),
  name: text("name").notNull(),
  clientName: text("client_name"),
  picClient: text("pic_client"),
  picPhone: text("pic_phone"),
  type: text("type").notNull(), // pengadaan, manage_service
  status: text("status").notNull().default("on_going"), // on_going, completed, on_hold, cancelled
  startDate: integer("start_date", { mode: "timestamp" }),
  endDate: integer("end_date", { mode: "timestamp" }),
  contractValue: integer("contract_value"),
  actualCost: integer("actual_cost").default(0), // Added for P&L
  progress: integer("progress").default(0), // Percentage
  createdAt: integer("created_at", { mode: "timestamp" }).$defaultFn(() => new Date()),
});

export const crmProjectTasks = sqliteTable("crm_project_tasks", {
  id: text("id").primaryKey(),
  projectId: text("project_id").notNull().references(() => crmProjects.id, { onDelete: "cascade" }),
  title: text("title").notNull(),
  description: text("description"),
  status: text("status").notNull().default("pending"), // pending, in_progress, completed, delayed
  priority: text("priority").default("medium"), // low, medium, high
  dueDate: integer("due_date", { mode: "timestamp" }),
  assignedTo: text("assigned_to"), // Simple string for now
  createdAt: integer("created_at", { mode: "timestamp" }).$defaultFn(() => new Date()),
  updatedAt: integer("updated_at", { mode: "timestamp" }).$defaultFn(() => new Date()),
});

export const crmInvoices = sqliteTable("crm_invoices", {
  id: text("id").primaryKey(),
  projectId: text("project_id").notNull().references(() => crmProjects.id),
  invoiceNumber: text("invoice_number").notNull().unique(),
  amount: integer("amount").notNull(),
  taxRate: integer("tax_rate").default(0),
  taxAmount: integer("tax_amount").default(0),
  downPaymentRate: integer("down_payment_rate").default(0),
  downPaymentAmount: integer("down_payment_amount").default(0),
  balanceAmount: integer("balance_amount").default(0),
  items: text("items"), // Added: Store as JSON array of objects
  dueDate: integer("due_date", { mode: "timestamp" }).notNull(),
  status: text("status").notNull().default("unpaid"), // unpaid, partial, paid, overdue
  pdfUrl: text("pdf_url"), // Added for auto-generated PDF
  notes: text("notes"),
  createdAt: integer("created_at", { mode: "timestamp" }).$defaultFn(() => new Date()),
});

export const crmPayments = sqliteTable("crm_payments", {
  id: text("id").primaryKey(),
  invoiceId: text("invoice_id").notNull().references(() => crmInvoices.id),
  amount: integer("amount").notNull(),
  paymentDate: integer("payment_date", { mode: "timestamp" }).notNull(),
  method: text("method"), // transfer, cash, etc.
  proofUrl: text("proof_url"),
  status: text("status").notNull().default("pending"), // pending, verified, rejected
  verifiedAt: integer("verified_at", { mode: "timestamp" }),
  verifiedBy: text("verified_by").references(() => user.id),
  createdAt: integer("created_at", { mode: "timestamp" }).$defaultFn(() => new Date()),
});

export const crmExpenses = sqliteTable("crm_expenses", {
  id: text("id").primaryKey(),
  projectId: text("project_id").notNull().references(() => crmProjects.id),
  title: text("title").notNull(),
  amount: integer("amount").notNull(),
  category: text("category").notNull(), // material, labor, vendor, overhead
  date: integer("date", { mode: "timestamp" }).notNull(),
  description: text("description"),
  receiptUrl: text("receipt_url"),
  createdAt: integer("created_at", { mode: "timestamp" }).$defaultFn(() => new Date()),
});

export const crmReminders = sqliteTable("crm_reminders", {
  id: text("id").primaryKey(),
  leadId: text("lead_id").notNull().references(() => crmLeads.id, { onDelete: "cascade" }),
  message: text("message").notNull(),
  remindAt: integer("remind_at", { mode: "timestamp" }).notNull(),
  isSent: integer("is_sent", { mode: "boolean" }).default(false),
  createdAt: integer("created_at", { mode: "timestamp" }).$defaultFn(() => new Date()),
});

// Relations
export const crmLeadsRelations = relations(crmLeads, ({ many }) => ({
  reminders: many(crmReminders),
}));

export const crmRemindersRelations = relations(crmReminders, ({ one }) => ({
  lead: one(crmLeads, { fields: [crmReminders.leadId], references: [crmLeads.id] }),
}));

export const crmProjectsRelations = relations(crmProjects, ({ one, many }) => ({
  lead: one(crmLeads, { fields: [crmProjects.leadId], references: [crmLeads.id] }),
  invoices: many(crmInvoices),
  expenses: many(crmExpenses),
  tasks: many(crmProjectTasks),
}));

export const crmProjectTasksRelations = relations(crmProjectTasks, ({ one }) => ({
  project: one(crmProjects, { fields: [crmProjectTasks.projectId], references: [crmProjects.id] }),
}));

export const crmExpensesRelations = relations(crmExpenses, ({ one }) => ({
  project: one(crmProjects, { fields: [crmExpenses.projectId], references: [crmProjects.id] }),
}));

export const crmInvoicesRelations = relations(crmInvoices, ({ one, many }) => ({
  project: one(crmProjects, { fields: [crmInvoices.projectId], references: [crmProjects.id] }),
  payments: many(crmPayments),
}));

export const crmPaymentsRelations = relations(crmPayments, ({ one }) => ({
  invoice: one(crmInvoices, { fields: [crmPayments.invoiceId], references: [crmInvoices.id] }),
}));


