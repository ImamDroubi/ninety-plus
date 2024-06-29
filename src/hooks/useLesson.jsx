import { useEffect, useState } from "react";
import useGetResource from "../apiCalls/useGetResource";

export const useLesson = (id) => {
  const { data, isSuccess, isLoading } = useGetResource(`lectures`, id);
  const [lesson, setLesson] = useState();
  useEffect(() => {
    if (data) {
      setLesson(data.data.data);
    }
  }, [isSuccess]);

  return { lesson, isLoading };
};
