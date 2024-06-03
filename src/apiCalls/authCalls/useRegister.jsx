import { useMutation } from "@tanstack/react-query";
import { API_BASE_URL } from "../index";
import axios from "axios";

export default function useRegister() {
  const mutation = useMutation({
    mutationFn: async (payload) => {
      return await axios.post(`${API_BASE_URL}/auth/register`, payload);
    },
  });
  return mutation;
}
