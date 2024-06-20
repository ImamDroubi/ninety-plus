import { useEffect, useState } from "react";

import useGetResources from "../apiCalls/useGetResources";

export const useComments = (resourceType, resourceId) => {
  const { data, isSuccess, isLoading, isError } = useGetResources(
    `comments/${resourceType}/${resourceId}`
  );
  const [comments, setComments] = useState();
  useEffect(() => {
    if (data) {
      console.log(data);
      setComments(data.data.data);
    }
  }, [isSuccess]);

  return { comments, isLoading };
};
