import { useState } from "react";
import axios from "axios";

export const useNetwork = () => {
  const [state, setState] = useState<{
    data?: any;
    loading: boolean;
    error: any;
  }>({
    data: null,
    loading: true,
    error: null,
  });

  const fetchData = async (url: string, method: string, data: any) => {
    setState((prev) => ({ ...prev, loading: true, error: null }));
    try {
      const response = await axios({ method, url, data });
      setState({ data: response.data, loading: false, error: null });
    } catch (error) {
      console.error("Axios error:", error);
      setState((prev) => ({ ...prev, loading: false, error }));
    }
  };

  return { ...state, fetchData };
};
