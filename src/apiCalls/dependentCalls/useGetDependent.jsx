import { useQuery } from "@tanstack/react-query";
import { API_BASE_URL } from "../index";
import { axiosInstance } from "../index";
export default function useGetDependent(resourceName, enableObject) {
  const query = useQuery({
    queryFn: () => {
      return axiosInstance.get(`${API_BASE_URL}/${resourceName}`);
    },
    queryKey: [`${resourceName}`],
    enabled: !!enableObject,
  });
  return query;
}
