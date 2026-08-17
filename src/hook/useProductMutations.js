import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';

export const useCreateProduct = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (newProduct) =>
      axios.post('https://api.escuelajs.co/api/v1/products', newProduct),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
    },
  });
};