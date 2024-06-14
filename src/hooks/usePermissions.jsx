import { useEffect, useState } from "react";

import useGetResources from "../apiCalls/useGetResources";

export const usePermissions = () => {
  const permissionsResponse = useGetResources("auth/me");
  const [permissionsOnUser, setPermissonsOnUser] = useState({});
  const [permissionsOnCourse, setPermissonsOnCourse] = useState({});
  const [permissionsOnModule, setPermissonsOnModule] = useState({});
  useEffect(() => {
    if (permissionsResponse.data?.data) {
      const permissions = permissionsResponse.data.data.permission;
      setPermissonsOnUser(permissions.user);
      setPermissonsOnCourse(permissions.course);
      setPermissonsOnModule(permissions.module);
    }
  }, [permissionsResponse.isSuccess]);

  return {
    permissionsOnCourse,
    permissionsOnModule,
    permissionsOnUser,
    permissionIsLoading: permissionsResponse.isLoading,
    permissionError: permissionsResponse.error,
  };
};
