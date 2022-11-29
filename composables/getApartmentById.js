import { useApartmentStore } from '@/stores/apartment';

export const getApartmentById = async (id) => {
  const apartments = useApartmentStore();

  return Object.assign(
    {},
    apartments.apartments.filter((apt) => apt.id === id)[0]
  );
};
