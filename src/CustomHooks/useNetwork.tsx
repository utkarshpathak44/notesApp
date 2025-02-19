import { useState } from "react";
import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";
import { FoldersResponseInterface, NoteDataInterface } from "../interfaces/ApiInterfaces";

interface NetworkState<T> {
  data?: T;
  loading: boolean;
  error: AxiosError | null;
}

export const useNetwork =<T=any> () => {
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
    data?: NoteDataInterface|FoldersResponseInterface|{}
  ) => {
    setState((prev) => ({ ...prev, loading: true, error: null }));
    try {
      const response:AxiosResponse<T> = await AxiosApi({ method, url, data });
      setState({ data: response.data, loading: false, error: null });
      return response.data//for getting the id of the newely created node

    } catch (error) {
      const axiosError = error as AxiosError;

      console.error("Axios error:", error);
      setState((prev) => ({ ...prev, loading: false, error:axiosError }));
    }
  };

  return { ...state, fetchData };
};
