import { useQuery } from "@tanstack/react-query";
import { API_BASE_URL } from "./index";
import axios from "axios";
export default function useGetResource(resourceName, resourceId) {
  const query = useQuery({
    queryFn: () => {
      return axios.get(`${API_BASE_URL}/${resourceName}/${resourceId}`);
    },
    queryKey: [`${resourceName}`, `${resourceId}`],
  });
  return query;
}
