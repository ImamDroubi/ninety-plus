import { useEffect, useState } from "react";

import useGetResources from "../apiCalls/useGetResources";

export const useFavouriteList = () => {
  const { data, isLoading, isError, isSuccess } =
    useGetResources("favorites/course");
  const [favouriteList, setFavouriteList] = useState();
  useEffect(() => {
    if (data) {
      setFavouriteList(data.data.data);
    }
  }, [isSuccess]);

  return {
    favouriteList,
    isLoading,
    isError,
  };
};
