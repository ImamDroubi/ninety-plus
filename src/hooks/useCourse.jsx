import { useEffect, useState } from "react";
import useGetResource from "../apiCalls/useGetResource";

export const useCourse = (id) => {
  const { data, isSuccess, isLoading } = useGetResource(`courses`, id);
  const [course, setCourse] = useState();
  useEffect(() => {
    if (data) {
      console.log(data);
      setCourse(data.data.data);
    }
  }, [isSuccess]);

  return { course, isLoading };
};
