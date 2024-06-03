import { useEffect, useState } from "react";

import useGetResources from "../apiCalls/useGetResources";

export const useRegistrationMenus = () => {
  const menus = useGetResources("guest/registration-data");
  const [streamList, setStreamList] = useState([]);
  const [cityList, setCityList] = useState([]);
  const [roleList, setRoleList] = useState([]);
  const [genderList, setGenderList] = useState([]);
  useEffect(() => {
    if (menus.data?.data?.data) {
      const lists = menus.data.data.data;
      setStreamList(lists.branches);
      setCityList(lists.countries[0].cites);
      setRoleList(lists.roles);
      setGenderList(lists.genders);
    }
  }, [menus.isSuccess]);

  return {
    streamList,
    cityList,
    roleList,
    genderList,
    menusIsLoading: menus.isLoading,
    menusError: menus.error,
  };
};
