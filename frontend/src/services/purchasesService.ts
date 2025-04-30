import { apiAdapter } from "./apiAdapter";
import { Purchase } from "../types/Purchase";

export const getPurchases = async (): Promise<Purchase[]> => {
  return apiAdapter.get<Purchase[]>("/api/purchases");
};

export const createPurchase = async (
  purchase: Omit<Purchase, "purchaseID">
): Promise<Purchase> => {
  return apiAdapter.post<Purchase>("/api/purchases", purchase);
};

export const updatePurchase = async (
  id: number,
  data: Partial<Purchase>
): Promise<Purchase> => {
  return apiAdapter.patch<Purchase>(`/api/purchases/${id}`, data);
};

export const deletePurchase = async (id: number): Promise<void> => {
  return apiAdapter.delete(`/api/purchases/${id}`);
};
