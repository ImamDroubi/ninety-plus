import { useMutation } from "@tanstack/react-query";
import { API_BASE_URL } from "../index";
import { axiosInstance } from "../index";

export default function useLogout() {
  const mutation = useMutation({
    mutationFn: async () => {
      return await axiosInstance.post(`${API_BASE_URL}/auth/logout`);
    },
  });
  return mutation;
}
