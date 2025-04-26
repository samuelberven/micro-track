import { RowDataPacket } from "mysql2";

export interface Customer extends RowDataPacket {
  customerID: number;
  servicePlatformID: number;
  username: string;
  email: string;
}
