/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useCallback } from "react";
import {
  HttpClientResponse,
  HttpMethod,
  HttpResponseData,
} from "../models/datatypes";
import { sendRequestEx } from "../services/api-request";

export const useHttpClient = (): HttpClientResponse<HttpResponseData> => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const sendRequest = useCallback(
    async (
      url: string,
      method: HttpMethod = "GET",
      body: any = null,
      headers: Record<string, string> = {}
    ) => {
      setIsLoading(true);

      try {
        const responseData = await sendRequestEx(url, method, body, headers);
        setIsLoading(false);
        return responseData;
      } catch (err: any) {
        setError(err);
        setIsLoading(false);
        throw err;
      }
    },
    []
  );

  const clearError = () => {
    setError(null);
  };

  return { isLoading, error, sendRequest, clearError };
};
