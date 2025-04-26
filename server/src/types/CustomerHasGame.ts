import { RowDataPacket } from "mysql2";

export interface CustomerHasGame extends RowDataPacket {
    customersHaveGamesID: number;
    customerID: number;
    gameID: number;
    installDate: string | Date;  // MySQL DATE might be returned as a string OR cast to a JavaScript 'Date' object
}
