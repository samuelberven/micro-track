import { RowDataPacket } from "mysql2";

export interface Game extends RowDataPacket {
  gameID: number;
  developerID: number;
  title: string;
  description: string;
  releaseDate: string | Date; // MySQL DATE might be returned as a string OR cast to a JavaScript 'Date' object
}
