export interface ApiAdapter {
  get<T>(endpoint: string): Promise<T>;
  post<T>(endpoint: string, data: any): Promise<T>;
  patch<T>(endpoint: string, data: any): Promise<T>;
  delete(endpoint: string): Promise<void>;
}