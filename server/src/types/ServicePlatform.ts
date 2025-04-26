import { RowDataPacket } from 'mysql2';

export interface ServicePlatform extends RowDataPacket {
  servicePlatformID: number;
  platformName: string;
}



// // old code
// export interface ServicePlatform {
//     servicePlatformID: number;
//     platformName: string;
//   }
