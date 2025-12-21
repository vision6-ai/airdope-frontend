# Campaign Payments PRD

## 1. Overview
The **Payments** tab within Manage Campaign provides financial management for creator partnerships. It handles contracts, milestone tracking, payment processing, and financial reporting for campaign collaborations.

## 2. User Stories

### Payment Management
* **As a Creator**, I want to set up payment terms with collaborators so expectations are clear.
* **As a Creator**, I want to track which payments are pending, processing, or completed.
* **As a Creator**, I want to release payments when deliverables are approved.

### Budgeting
* **As a Creator**, I want to see my campaign budget vs actual spend in real-time.
* **As a Creator**, I want to set budget alerts to avoid overspending.
* **As a Creator**, I want to allocate budget across different creators.

### Contracts & Agreements
* **As a Creator**, I want to send contracts to creators for signature.
* **As a Creator**, I want to define deliverables and payment milestones in contracts.
* **As a Creator**, I want to track contract status (Sent, Signed, Expired).

### Reporting
* **As a Creator**, I want to download payment history for accounting.
* **As a Creator**, I want to see ROI metrics comparing spend to campaign results.
* **As a Creator**, I want to generate 1099/tax reports for creator payments.

## 3. Key Features & Components

### 3.1. Budget Overview Card
* **Component:** `BudgetOverviewCard`
* **Metrics:**
  * Total Budget
  * Committed (contracted but not paid)
  * Spent (payments completed)
  * Remaining
  * Budget utilization percentage bar
* **Actions:** Edit Budget, Set Alert

### 3.2. Payments Table
* **Component:** `PaymentsTable`
* **Columns:**
  * Creator (avatar + name)
  * Deliverable description
  * Amount
  * Due Date
  * Status (Pending, Processing, Completed, Failed)
  * Actions (Approve, Release, View Details)
* **Features:**
  * Filter by status
  * Sort by date or amount
  * Bulk actions (approve all, export)

### 3.3. Payment Detail Modal
* **Component:** `PaymentDetailModal`
* **Sections:**
  * Creator info and contact
  * Deliverable details with attachments
  * Payment history for this creator
  * Transaction details (ID, processor, fees)
  * Approval workflow steps
* **Actions:** Approve, Reject, Request Revision, Release Payment

### 3.4. Create Payment Flow
* **Component:** `CreatePaymentModal`
* **Steps:**
  1. Select Creator from roster/campaign
  2. Define Deliverable (description, deadline)
  3. Set Amount and Payment Terms
  4. Review and Send
* **Payment Terms:**
  * Upfront
  * Upon Approval
  * 50/50 Split
  * Milestone-based

### 3.5. Contracts Manager
* **Component:** `ContractsSection`
* **Features:**
  * Contract templates library
  * Create custom contract
  * E-signature integration
  * Contract status tracker
  * Renewal reminders

### 3.6. Contract Card
* **Component:** `ContractCard`
* **Elements:**
  * Creator name
  * Contract title
  * Status (Draft, Sent, Signed, Expired)
  * Total value
  * Deliverables count
  * Expiration date
  * Actions: View, Edit, Send, Download

### 3.7. ROI Dashboard
* **Component:** `PaymentROICard`
* **Metrics:**
  * Total Spend
  * Revenue Attributed (if tracked)
  * ROAS (Return on Ad Spend)
  * Cost per Engagement
  * Cost per Conversion
* **Visualization:** Line chart showing spend vs results over time

### 3.8. Tax & Compliance Section
* **Component:** `TaxComplianceSection`
* **Features:**
  * W-9 collection tracker
  * 1099 generation for US creators
  * Payment threshold warnings ($600 limit)
  * Tax document downloads

## 4. User Flow

### Creating a Payment
1. User navigates to Campaign → Payments tab
2. User clicks "New Payment"
3. User selects creator from dropdown
4. User enters deliverable details
5. User sets amount ($500) and terms (Upon Approval)
6. User reviews and sends payment request
7. Creator receives notification
8. Status shows "Pending Approval"

### Releasing a Payment
1. Creator submits deliverable
2. User reviews content in Payments table
3. User clicks "Approve" on deliverable
4. User clicks "Release Payment"
5. System processes payment via Stripe
6. Status updates to "Processing" then "Completed"
7. Creator receives payment notification

### Contract Workflow
1. User creates contract from template
2. User customizes terms and deliverables
3. User sends contract to creator's email
4. Creator receives DocuSign link
5. Creator reviews and signs
6. User receives signed copy
7. Contract status updates to "Signed"

## 5. Data Models

### Payment
```typescript
interface Payment {
  id: string;
  campaignId: string;
  creatorId: string;
  amount: number;
  currency: "USD" | "EUR" | "GBP";
  status: "draft" | "pending" | "approved" | "processing" | "completed" | "failed";
  deliverable: {
    description: string;
    deadline: Date;
    attachments?: string[];
    approvedAt?: Date;
  };
  terms: "upfront" | "upon_approval" | "split_50_50" | "milestone";
  milestones?: {
    description: string;
    amount: number;
    status: "pending" | "completed";
  }[];
  transactionId?: string;
  processorFee?: number;
  createdAt: Date;
  paidAt?: Date;
}
```

### Contract
```typescript
interface Contract {
  id: string;
  campaignId: string;
  creatorId: string;
  title: string;
  status: "draft" | "sent" | "signed" | "expired" | "terminated";
  totalValue: number;
  deliverables: {
    description: string;
    deadline: Date;
    payment: number;
  }[];
  terms: string;
  startDate: Date;
  endDate: Date;
  documentUrl?: string;
  signedAt?: Date;
  signedByCreator?: string;
  signedByBrand?: string;
}
```

### BudgetAllocation
```typescript
interface BudgetAllocation {
  campaignId: string;
  totalBudget: number;
  committed: number;
  spent: number;
  remaining: number;
  alertThreshold?: number;
  allocations: {
    creatorId: string;
    allocated: number;
    spent: number;
  }[];
}
```

## 6. Acceptance Criteria

### Budget Management
- [ ] Budget bar updates in real-time as payments process
- [ ] Alert triggers when spend exceeds threshold
- [ ] Remaining budget cannot go negative
- [ ] Budget can be edited with audit trail

### Payments Table
- [ ] All payment statuses render with correct colors
- [ ] Bulk approve processes up to 20 payments
- [ ] Failed payments show retry option
- [ ] Export includes all transaction details

### Payment Processing
- [ ] Stripe integration processes within 3 business days
- [ ] Creator receives email notification on payment
- [ ] Transaction fees displayed transparently
- [ ] Refund workflow available for failed deliverables

### Contracts
- [ ] Templates auto-fill campaign and creator details
- [ ] E-signature completes within DocuSign
- [ ] Signed documents stored securely
- [ ] Expiration warnings sent 7 days before

## 7. Error States

| Scenario | Error Message | User Action |
|----------|--------------|-------------|
| Payment failed | "Payment could not be processed. Check the payment method." | Retry or contact support |
| Insufficient funds | "Campaign budget exceeded. Increase budget to continue." | Edit budget |
| Contract expired | "This contract has expired. Create a new one." | Create new contract |
| Creator not verified | "Creator hasn't completed payment setup." | Send reminder |
| Processing timeout | "Payment processing delayed. We'll notify you when complete." | None (auto-resolves) |

## 8. Empty States

| State | Message | Call to Action |
|-------|---------|----------------|
| No payments | "No payments for this campaign yet" | "Create your first payment" |
| No contracts | "No contracts created" | "Create from template" |
| No pending | "All payments up to date" | None (success state) |

## 9. UI/UX Details
* **Theme:** Dark mode with green accents for money-related actions
* **Status Colors:**
  * Draft: Gray
  * Pending: Yellow
  * Approved: Blue
  * Processing: Purple (animated)
  * Completed: Green
  * Failed: Red
* **Budget Bar:** Gradient from green (under budget) to red (over budget)
* **Currency:** Always display with symbol and two decimals
* **Tables:** Sticky header, sortable columns, row hover

## 10. Technical Notes
* **Payment Processor:** Stripe Connect for creator payouts
* **E-Signature:** DocuSign API integration
* **Tax Reporting:** Generate 1099-NEC for US payments >$600
* **Audit Trail:** Log all payment status changes
* **Encryption:** PCI-compliant storage for payment data
* **Currencies:** Support USD, EUR, GBP with real-time conversion

## 11. Future Considerations
* Multi-currency support with automatic conversion
* Recurring payment schedules for ongoing partnerships
* Invoice generation for tax purposes
* Integration with accounting software (QuickBooks, Xero)
* Escrow functionality for high-value deals
* Automated payment release based on content approval
