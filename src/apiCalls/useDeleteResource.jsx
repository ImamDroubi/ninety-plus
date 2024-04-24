import { useMutation } from '@tanstack/react-query'
import {API_BASE_URL} from "./index";
import axios from 'axios'


export default function useDeleteResource(resourceName, resourceId) {
  const mutation = useMutation({
    mutationFn : ()=>{
      return axios.delete(`${API_BASE_URL}/${resourceName}/${resourceId}`);
    }
  })
  return mutation;
}
