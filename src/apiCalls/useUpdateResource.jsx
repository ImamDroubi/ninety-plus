import { useMutation } from "@tanstack/react-query";
import { API_BASE_URL } from "./index";
import { axiosInstance } from "./index";
export default function useUpdateResource(resourceName) {
  const mutation = useMutation({
    mutationFn: (resourceId, payload) => {
      return axiosInstance.put(
        `${API_BASE_URL}/${resourceName}/${resourceId}`,
        payload
      );
    },
    mutationKey: [`${resourceName}`],
  });
  return mutation;
}
