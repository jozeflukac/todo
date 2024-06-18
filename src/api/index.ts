import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryKey,
} from "@tanstack/react-query";

export const useApiGet = (key: QueryKey, fn: Function, options?: any) =>
  useQuery({
    queryKey: key,
    queryFn: fn,
    ...options,
  });

export const useApiSend = (
  fn: unknown,
  success: Function,
  error: any,
  invalidateKey?: [any][],
  options?: any
) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: fn,
    onSuccess: (data) => {
      invalidateKey &&
        invalidateKey.forEach((key) => {
          queryClient.invalidateQueries({ queryKey: key });
        });
      success && success(data);
    },
    onError: error,
    retry: 1,
    ...options,
  });
};
