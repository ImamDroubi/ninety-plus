import { useMutation } from "@tanstack/react-query";
import { API_BASE_URL } from "./index";
import axios from "axios";
export default function useUpdateResource(resourceName, resourceId, payload) {
  const mutation = useMutation({
    mutationFn: () => {
      return axios.post(
        `${API_BASE_URL}/${resourceName}/${resourceId}`,
        payload
      );
    },
  });
  return mutation;
}
