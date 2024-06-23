import { useMutation } from "@tanstack/react-query";
import { API_BASE_URL } from "./index";
import { axiosInstance } from "./index";

export default function useDeleteResource(resourceName) {
  const mutation = useMutation({
    mutationFn: (resourceId) => {
      return axiosInstance.delete(
        `${API_BASE_URL}/${resourceName}/${resourceId}`
      );
    },
    mutationKey: [`${resourceName}`],
  });
  return mutation;
}
