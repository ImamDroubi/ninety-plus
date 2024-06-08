import { useMutation } from "@tanstack/react-query";
import { API_BASE_URL } from "./index";
import axios from "axios";
export default function useCreateResource(resourceName) {
  const mutation = useMutation({
    mutationFn: (payload) => {
      return axios.post(
        `${API_BASE_URL}/${resourceName}`,
        payload
      );
    },
    mutationKey: [`${resourceName}`],
  });
  return mutation;
}
