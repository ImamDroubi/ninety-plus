import { useMutation } from "@tanstack/react-query";
import { API_BASE_URL } from "./index";
import { axiosInstance } from "./index";
export default function usePurchaseCourse() {
  const mutation = useMutation({
    mutationFn: (courseId, payload) => {
      return axiosInstance.post(
        `${API_BASE_URL}/payment/course/${courseId}/checkout`,
        payload
      );
    },
    mutationKey: [`courses`],
  });
  return mutation;
}
