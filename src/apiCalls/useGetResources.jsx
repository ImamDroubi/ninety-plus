import { useQuery } from "@tanstack/react-query";
import { API_BASE_URL } from "./index";
import axios from "axios";
export default function useGetResources(resourceName) {
  const query = useQuery({
    queryFn: () => {
      return axios.get(`${API_BASE_URL}/${resourceName}`);
    },
    queryKey: [`${resourceName}`],
  });
  return query;
}
