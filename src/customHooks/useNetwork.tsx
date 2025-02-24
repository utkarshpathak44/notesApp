import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";
import { useCallback, useState } from "react";

interface NetworkState<T> {
  data?: T;
  loading: boolean;
  error: AxiosError | null;
}

const AxiosApi = axios.create({
  baseURL: "https://nowted-server.remotestate.com",
});
export const useNetwork = <T = unknown,>() => {
  const [state, setState] = useState<NetworkState<T>>({
    data: undefined,
    loading: false,
    error: null,
  });

  const fetchData = useCallback(
    async <P = unknown,>(
      url: string,
      method: AxiosRequestConfig["method"],
      data?: P,
    ): Promise<T | undefined> => {
      // Ensure return type
      setState((prev) => ({ ...prev, loading: true, error: null }));
      try {
        const response: AxiosResponse<T> = await AxiosApi({
          method,
          url,
          data,
        });
        setState({ data: response.data, loading: false, error: null });
        return response.data; // Ensures fetchData always returns something
      } catch (error) {
        const axiosError = error as AxiosError;
        console.error("Axios error:", error);
        setState((prev) => ({ ...prev, loading: false, error: axiosError }));
        return undefined; // Explicitly return undefined in case of failure
      }
    },
    [],
  );

  return { ...state, fetchData };
};
