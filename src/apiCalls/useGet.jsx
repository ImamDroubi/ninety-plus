import { useQuery } from "@tanstack/react-query";
import { API_BASE_URL } from "./index";
import { axiosInstance } from "./index";
export default function useGet(endpoint) {
  const query = useQuery({
    queryFn: () => {
      return axiosInstance.get(`${API_BASE_URL}/${endpoint}`);
    },
    queryKey: [`${endpoint}`],
  });
  return query;
}
