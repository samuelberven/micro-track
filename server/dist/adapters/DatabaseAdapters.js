import mysql from "mysql2/promise";
import dotenv from "dotenv";
dotenv.config();
// // A custom type for INSERT results
// interface InsertResult {
//   insertId: number;
//   affectedRows: number;
//   warningCount: number;
// }
// Base DB
// adapter with shared functionality; Note: abstract class, so designed to be extended (not instantiated)
export class BaseMySQLAdapter {
    connection = null;
    ensureConnected() {
        if (!this.connection) {
            throw new Error("Database connection is not established.");
        }
        return this.connection;
    }
    // Query method for SELECT statements (returns rows as an array)
    async query(sql, params) {
        const connection = this.ensureConnected();
        const [rows] = await connection.execute(sql, params);
        return rows;
    }
    // Command method for INSERT/UPDATE/DELETE statements (returns the result object)
    async command(sql, params) {
        const connection = this.ensureConnected();
        const [result] = await connection.execute(sql, params);
        return result; // Allow type inference or custom types
    }
    async close() {
        const connection = this.ensureConnected();
        await connection.end();
    }
}
// Local MySQL Adapter (for development)
export class LocalMySQLAdapter extends BaseMySQLAdapter {
    async connect() {
        console.log("Connecting to DB with config:", {
            host: process.env.MYSQL_HOST || "localhost",
            user: process.env.MYSQL_USER || "root",
            database: process.env.MYSQL_DATABASE,
        });
        this.connection = await mysql.createConnection({
            host: process.env.MYSQL_HOST || "localhost",
            user: process.env.MYSQL_USER || "root",
            password: process.env.MYSQL_PASSWORD,
            database: process.env.MYSQL_DATABASE,
        });
    }
}
// Azure MySQL Adapter (for production)
export class AzureMySQLAdapter extends BaseMySQLAdapter {
    async connect() {
        this.connection = await mysql.createConnection({
            host: process.env.AZURE_DB_HOST,
            user: process.env.AZURE_DB_USER,
            password: process.env.AZURE_DB_PASSWORD,
            database: process.env.AZURE_DB_NAME,
            ssl: { rejectUnauthorized: true }, // Azure requires SSL
        });
    }
}
// Note: In a real-world application, you would likely want to handle connection pooling, error handling, and other aspects of database management more robustly.
