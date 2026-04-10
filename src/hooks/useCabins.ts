import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createCabin, deleteCabin, getCabins, updateCabin } from "../services/apiCabins";
import toast from "react-hot-toast";
import type { Cabin } from "../components/CabinForm";

export function useCabins() {
  return useQuery({
    queryKey: ["cabins"],
    queryFn: getCabins,
  });
}

export function useCreateCabin() {
  const queryClient = useQueryClient();
  return useMutation({
    // mutationFn: (newCabin:Cabin) => createCabin(newCabin),
    mutationFn: createCabin,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cabins"] });
      toast.success("Cabin successfully created!");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
}

export function useUpdateCabin() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({newCabin, id}: {newCabin: Cabin, id: number}) => updateCabin(newCabin, id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cabins"] });
      toast.success("Cabin successfully updated!");
    },
    onError: (error) => {
      toast.error(error.message);
    },
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
