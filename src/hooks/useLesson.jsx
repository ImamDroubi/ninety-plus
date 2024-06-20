import { useEffect, useState } from "react";
import useGetResource from "../apiCalls/useGetResource";

export const useLesson = (id) => {
  const { data, isSuccess, isLoading } = useGetResource(`lessons`, id);
  const [lesson, setLesson] = useState();
  useEffect(() => {
    if (data) {
      console.log(data);
      setLesson(data.data.data);
    }
  }, [isSuccess]);

  return { lesson, isLoading };
};
