import { useEffect, useState } from "react";

import useGetResources from "../apiCalls/useGetResources";

export const useRegistrationMenus = () => {
  const {isError, isLoading, isSuccess, data} = useGetResources("guest/registration-data");
  useEffect(()=>{
    console.log(data);
  },[isSuccess])
  return {};
};
