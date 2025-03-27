import { createFetch } from "@/services/constants";
import { useMutation, useQuery, useQueryClient } from "@tanstack/vue-query";

const fetchRockets = createFetch("/rockets");

export const useRockets = () => {
  return useQuery({
    queryKey: ["rockets"],
    queryFn: async () => {
      const res = await fetchRockets.get({});
      return res;
    },
  });
};

export const useRocketDetail = (id: string) => {
  return useQuery({
    queryKey: ["rocket", id],
    queryFn: async () => {
      const res = await createFetch(`/rockets/${id}`).get({});
      return res;
    },
  });
};

export const useAddRocket = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (newRocket) => {
      const res = await fetchRockets.post({ body: newRocket });
      return res;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["rockets"],
      });
    },
  });
};
