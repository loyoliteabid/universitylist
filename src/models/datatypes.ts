/* eslint-disable @typescript-eslint/no-explicit-any */

// Define TypeScript types

export type HttpMethod = "GET" | "POST" | "PUT" | "DELETE" | "PATCH"; // Add other HTTP methods if needed
export type HttpResponseData = any; // Define a type for the response data if needed
export type SortBy = "asc" | "dsc";

export interface HttpClientResponse<T> {
  isLoading: boolean;
  error: Error | null;
  sendRequest: (
    url: string,
    method?: HttpMethod,
    body?: any,
    headers?: Record<string, string>
  ) => Promise<T>;
  clearError: () => void;
}

export interface University {
  id: string;
  name: string;
  web_pages: string[];
  state_province?: string;
  country: string;
  domains: string[];
  country_code: string;
}
