/** Payment processor is TBD. Staff manage membership state by hand. */

export type BillingProvider = {
  name: string;
  createCustomer: (input: { email: string; name: string }) => Promise<{
    customerId: string | null;
  }>;
  startMembership: (input: {
    customerId: string | null;
    tier: string;
  }) => Promise<{ subscriptionId: string | null }>;
  cancelMembership: (subscriptionId: string | null) => Promise<void>;
};

export const manualBilling: BillingProvider = {
  name: "manual",
  async createCustomer() {
    return { customerId: null };
  },
  async startMembership() {
    return { subscriptionId: null };
  },
  async cancelMembership() {
    return;
  },
};

export function getBillingProvider(): BillingProvider {
  return manualBilling;
}
