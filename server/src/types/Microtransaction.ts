import { RowDataPacket } from "mysql2";

export interface Microtransaction extends RowDataPacket {
  microtransactionID: number;
  gameID: number;
  price: string; // Note: This is DECIMAL(19,2) in MySQL, but a string is used here to preserve precision
  description: string;
}
