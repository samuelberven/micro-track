import { RowDataPacket } from "mysql2";

export interface Purchase extends RowDataPacket {
    purchaseID: number;
    customerID: number;
    microtransactionID: number;
    date: string | Date;  // MySQL DATE might be returned as a string OR cast to a JavaScript 'Date' object
}
