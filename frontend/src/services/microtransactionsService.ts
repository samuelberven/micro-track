import { apiAdapter } from "./apiAdapter";
import { Microtransaction } from "../types/Microtransaction";

export const getMicrotransactions = async (): Promise<Microtransaction[]> => {
  return apiAdapter.get<Microtransaction[]>("/api/microtransactions");
};

export const createMicrotransaction = async (
  microtransaction: Omit<Microtransaction, "microtransactionID">
): Promise<Microtransaction> => {
  return apiAdapter.post<Microtransaction>("/api/microtransactions", microtransaction);
};

export const updateMicrotransaction = async (
  id: number,
  data: Partial<Microtransaction>
): Promise<Microtransaction> => {
  return apiAdapter.patch<Microtransaction>(`/api/microtransactions/${id}`, data);
};

export const deleteMicrotransaction = async (id: number): Promise<void> => {
  return apiAdapter.delete(`/api/microtransactions/${id}`);
};
