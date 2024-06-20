import { useQuery } from "@tanstack/react-query";
import { API_BASE_URL } from "../index";
import { axiosInstance } from "../index";
export default function useGetDependentResource(resourceName, resourceId, enableObject) {
  const query = useQuery({
    queryFn: () => {
      return axiosInstance.get(`${API_BASE_URL}/${resourceName}/${resourceId}`);
    },
    queryKey: [`${resourceName}`, `${resourceId}`],
    enabled : !!enableObject
  });
  return query;
}
