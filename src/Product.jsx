import React, { useEffect, useState } from "react";
import { getProducts } from "./constant/data/product";


const Product = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    getProducts()
      .then((data) => setProducts(data))
      .catch((err) => console.log(err));
  }, []);

 return (
  <div className="max-w-7xl mx-auto p-6">
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {products.map((item) => (
        <div
          key={item.id}
          className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition duration-300"
        >
          <img
            src={item.images[0]}
            alt={item.title}
            className="w-full h-52 object-cover"
          />

          <div className="p-4">
            <h2 className="text-lg font-semibold line-clamp-2">
              {item.title}
            </h2>

            <p className="text-gray-500 text-sm mt-2 line-clamp-3">
              {item.description}
            </p>

            <div className="flex justify-between items-center mt-4">
              <span className="text-xl font-bold text-green-600">
                ${item.price}
              </span>

              <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition">
                Buy
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
);
};

export default Product;