import { useQuery } from '@tanstack/react-query';
import { getProducts } from '../constant/data/product'; // o'zingdagi yo'lga moslashtir

export const useProducts = () => {
  return useQuery({
    queryKey: ['products'],
    queryFn: getProducts,
  });
};