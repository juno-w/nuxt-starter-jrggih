export const useApproveInventories = async (apartmentId) => {
  const config = useRuntimeConfig();

  const { data, pending, error, refresh } = await useFetch(
    `${config.public.apiBase}/apartments/${apartmentId}/approve-inventories`,
    {
      method: "POST",
    }
  );

  return { data, pending, error, refresh };
};
