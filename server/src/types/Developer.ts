import { RowDataPacket } from "mysql2";

export interface Developer extends RowDataPacket {
    developerID: number;
    developerName: string;
    address: string;
    city: string;
    state: string;
    zipCode: number;
    email: string;
    contact: string;
}