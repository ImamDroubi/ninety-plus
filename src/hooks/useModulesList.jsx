import { useEffect, useState } from "react";

import useGetResources from "../apiCalls/useGetResources";

export const useModulesList = () => {
  const modules = useGetResources("countries/1/modules");
  const [modulesList, setModulesList] = useState([]);
  useEffect(() => {
    if (modules.data?.data?.data) {
      const list = modules.data.data.data;
      setModulesList(list);
    }
  }, [modules.isSuccess]);

  return {
    modulesList,
    modulesIsLoading: modules.isLoading,
    modulesError: modules.error,
  };
};
