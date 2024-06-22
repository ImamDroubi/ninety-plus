import { useMutation } from "@tanstack/react-query";
import { API_BASE_URL } from "./index";
import { axiosInstance } from "./index";
export default function useUpdateResource(resourceName, resourceId) {
  const mutation = useMutation({
    mutationFn: (payload) => {
      return axiosInstance.put(
        `${API_BASE_URL}/${resourceName}/${resourceId}`,
        payload
      );
    },
    mutationKey: [`${resourceName}`, `${resourceId}`],
  });
  return mutation;
}
