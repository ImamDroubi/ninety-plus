import { useEffect, useState } from "react";
import useGetDependent from "../apiCalls/dependentCalls/useGetDependent";

export const useProfile = (enableObject) => {
  const { data, isSuccess, isLoading } = useGetDependent(
    `profiles`,
    enableObject
  );
  const [profileInfo, setProfileInfo] = useState();
  useEffect(() => {
    if (data) {
      setProfileInfo(data.data.data);
    }
  }, [isSuccess]);

  return { profileInfo, isLoading };
};
