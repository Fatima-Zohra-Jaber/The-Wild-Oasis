import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {  deleteCabin, getCabins } from "../services/apiCabins";
import toast from "react-hot-toast";

export function useCabins() {
  return useQuery({
    queryKey: ["cabins"],
    queryFn: getCabins,
  });
}



export function useDeleteCabin() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: number) => deleteCabin(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cabins"] });
      toast.success("Cabin successfully deleted!");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
}
