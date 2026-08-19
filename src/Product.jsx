import { useQuery } from "@tanstack/react-query";

import ProductHeader from "./ProductHeader";
import ProductRow from "./ProductRow";
import { api } from "./api/api";

const Product = () => {
  const {
    data: products = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["products"],
    queryFn: () => api.get("/products").then((res) => res.data),
  });

  if (isLoading) return <p className="p-6">Yuklanmoqda...</p>;
  if (error) return <p className="p-6 text-red-500">Xato: {error.message}</p>;

  return (
    <div className="max-w-7xl mx-auto p-6">
      <ProductHeader />

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-6">
        {products.map((item) => (
          <ProductRow key={item.id} product={item} />
        ))}
      </div>
    </div>
  );
};

export default Product;