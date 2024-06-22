import useCreateResource from "./useCreateResource";
export const useUpdateProfile = () => {
  const mutation = useCreateResource(`profiles`);

  return mutation;
};
