import { useEffect, useState } from "react";
import axios from "axios";

export const useNetwork = (url: string, method: string, data: typeof Object) => {
  const [state, setState] = useState<{
    data?: any;
    loading: boolean;
    error: any;
  }>({
    data: null,
    loading: true,
    error: null,
  });

  useEffect(() => {
    let isMounted = true;

    setState((prev) => ({ ...prev, loading: true, error: null }));

    const fetchData = async () => {
      try {
        const config = {
          method,
          url,
          data,
        };

        const response = await axios(config);
        if (isMounted) {
          setState((prev) => ({
            error: null,
            data: response.data,
            loading: false,
          }));
        }
      } catch (error) {
        console.error("Axios error:", error);
        if (isMounted) {
          setState((prev) => ({ data: null, loading: false, error }));
        }
      }
    };

    fetchData();

    return () => {
      isMounted = false;
    };
  }, [method,url,data]);

  return state;
};
