import { mockAPI } from "./mockServer";

export async function getTransactions() {
  const transactions = await mockAPI();
  return transactions;
};