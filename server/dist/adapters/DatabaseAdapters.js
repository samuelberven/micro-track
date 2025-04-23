import mysql from 'mysql2/promise';
import dotenv from 'dotenv';
dotenv.config();
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
    async query(sql, params) {
        const connection = this.ensureConnected();
        const [rows] = await connection.execute(sql, params);
        return rows;
    }
    async close() {
        const connection = this.ensureConnected();
        await connection.end();
    }
}
// Local MySQL Adapter (for development)
export class LocalMySQLAdapter extends BaseMySQLAdapter {
    async connect() {
        this.connection = await mysql.createConnection({
            host: process.env.MYSQL_HOST,
            user: process.env.MYSQL_USER,
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
