export interface Purchase {
  purchaseID: number;
  customerID: number | null;
  microtransactionID: number;
  date: string;
}