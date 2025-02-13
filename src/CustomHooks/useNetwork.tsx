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
    setState({ data: null, loading: true, error: null });

    try {
      const config = {
        method,
        url,
        data,
      };

      const response = await axios(config);
      setState({ data: response.data, loading: false, error: null });
      console.log(response.data);
    } catch (error) {
      console.error("Axios error:", error);
      setState({ data: null, loading: false, error });
    }
  };

  return { ...state, fetchData };
};
