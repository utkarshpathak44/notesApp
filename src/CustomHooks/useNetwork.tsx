import { useState } from "react";
import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";
import {
  FoldersResponseInterface,
  NoteDataInterface,
  NoteInterface,
  noteResponseData,
} from "../interfaces/ApiInterfaces";

interface NetworkState<T> {
  data?: T;
  loading: boolean;
  error: AxiosError | null;
}

export const useNetwork = <
  T = NoteDataInterface | FoldersResponseInterface | NoteInterface[] |{id:string}
>() => {
  const AxiosApi = axios.create({
    baseURL: "https://nowted-server.remotestate.com",
  });
  const [state, setState] = useState<NetworkState<T>>({
    data: undefined,
    loading: false,
    error: null,
  });

  const fetchData = async (
    url: string,
    method: AxiosRequestConfig["method"],
    data?: NoteDataInterface | FoldersResponseInterface | noteResponseData | {} |number
  ): Promise<T | undefined> => {  // Ensure return type
    setState((prev) => ({ ...prev, loading: true, error: null }));
    try {
      const response: AxiosResponse<T> = await AxiosApi({ method, url, data });
      setState({ data: response.data, loading: false, error: null });
      return response.data; // Ensures fetchData always returns something
    } catch (error) {
      const axiosError = error as AxiosError;
      console.error("Axios error:", error);
      setState((prev) => ({ ...prev, loading: false, error: axiosError }));
      return undefined;  // Explicitly return undefined in case of failure
    }
  };

  return { ...state, fetchData };
};
