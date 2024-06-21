import { useEffect, useState } from "react";
import useGetDependentResource from "../apiCalls/dependentCalls/useGetDependentResource";

export const useUserInfo = (id, enableObject) => {
  const { data, isSuccess, isLoading } = useGetDependentResource(`users`, id, enableObject);
  const [userInfo, setUserInfo] = useState();
  useEffect(() => {
    if (data) {
      console.log(data);
      setUserInfo(data.data.data);
    }
  }, [isSuccess]);

  return { userInfo, isLoading };
};
