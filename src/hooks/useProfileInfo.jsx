import { useEffect, useState } from "react";
import useGet from "../apiCalls/useGet";

export const useProfileInfo = () => {
  const { data, isSuccess, isLoading } = useGet(`profiles`);
  const [user, setUser] = useState();
  useEffect(() => {
    if (data) {
      console.log(data);
      setUser(data.data.data);
    }
  }, [isSuccess]);

  return { user };
};
