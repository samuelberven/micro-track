// import mysql from 'mysql2/promise';
// import dotenv from 'dotenv';


// dotenv.config();


// export interface IDatabaseAdapter {
//     connect(): Promise<void>;
//     query(sql: string, params?: any[]): Promise<any>;
//     close(): Promise<void>;
// }

// // MySQL Adapter for local development
// export class LocalMySQLAdapter implements IDatabaseAdapter {
//     private connection: mysql.Connection;

//     async connect(): Promise<void> {
//         this.connection = await mysql.createConnection({
//             host: process.env.MYSQL_HOST,
//             user: process.env.MYSQL_USER,
//             password: process.env.MYSQL_PASSWORD,
//             database: process.env.MYSQL_DATABASE,
//         });
//     }
//         })
//     }

// }


// // MYSQL_ROOT_PASSWORD=rootpassword
// // MYSQL_DATABASE=gotcha_games
// // MYSQL_USER=user
// // MYSQL_PASSWORD=password

