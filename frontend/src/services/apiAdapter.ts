import { ApiAdapter } from "../types/ApiAdapter";

// RESTful implementation of api adapter
export class RestApiAdapter implements ApiAdapter {
  baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  async get<T>(endpoint: string): Promise<T> {
    const response = await fetch(`${this.baseUrl}${endpoint}`);
    if (!response.ok) {
      throw new Error(`HTTP GET Error: ${response.status}`);
    }
    return response.json();
  }

  async post<T>(endpoint: string, data: any): Promise<T> {
    const response = await fetch(`${this.baseUrl}${endpoint}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      throw new Error(`HTTP POST Error: ${response.status}`);
    }
    return response.json();
  }

  async patch<T>(endpoint: string, data: any): Promise<T> {
    const response = await fetch(`${this.baseUrl}${endpoint}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      throw new Error(`HTTP PATCH Error: ${response.status}`);
    }
    return response.json();
  }

  async delete(endpoint: string): Promise<void> {
    const response = await fetch(`${this.baseUrl}${endpoint}`, {
      method: "DELETE",
    });
    if (!response.ok) {
      throw new Error(`HTTP DELETE Error: ${response.status}`);
    }
  }
}

// Get base API URL from Azure if present, or local (set in your .env.frontend) if not
const BASE_API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

// Export singleton instance of RestApiAdapter for the rest of the app to use
export const apiAdapter = new RestApiAdapter(BASE_API_URL);
