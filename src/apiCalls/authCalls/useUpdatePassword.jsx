import { useMutation } from "@tanstack/react-query";
import { API_BASE_URL } from "../index";
import { axiosInstance } from "../index";

export default function useUpdatePassword() {
  const mutation = useMutation({
    mutationFn: async (payload) => {
      return await axiosInstance.patch(
        `${API_BASE_URL}/profiles/change-password`,
        payload
      );
    },
  });
  return mutation;
}
