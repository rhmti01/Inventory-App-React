import React, { useEffect, useState } from "react";
import ProductItem from "./ProductItem";
import { useProducts } from "../Context/ProductsContext";

function ProductsList({ searchValue, sortValue }) {
  const {products , setProducts} = useProducts()
  const [filteredProducts, setFilteredProducts] = useState(products);

  const deleteProduct = (removedProductId) => {
    setProducts((prev) => prev.filter((p) => p.id !== removedProductId));
  };

  useEffect(() => {
    const normalizedSearchTerm = searchValue.toLowerCase().trim();

    let result = products.filter((product) =>
      product.title.toLowerCase().includes(normalizedSearchTerm)
    );

    const sortFunctions = {
      newest: (a, b) => b.id - a.id,
      oldest: (a, b) => a.id - b.id,
      "A-Z": (a, b) =>
        a.title.toLowerCase().localeCompare(b.title.toLowerCase()),
      "Z-A": (a, b) =>
        b.title.toLowerCase().localeCompare(a.title.toLowerCase()),
    };

    if (sortFunctions[sortValue]) {
      result = [...result].sort(sortFunctions[sortValue]);
    }

    setFilteredProducts(result);
  }, [products, searchValue, sortValue]);

  if (filteredProducts.length < 1) {
    return (
      <div className="h-52 w-full flex justify-center items-center">
        <p className="text-white font-medium text-xl">
          {searchValue ? "No products found!" : "Products list is empty!"}
        </p>
      </div>
    );
  }

  return (
    <div className="w-full overflow-x-auto mt-8">
      <table className="min-w-[700px] rounded-xl overflow-hidden">
        <thead className="bg-[#1b2127] text-white font-medium">
          <tr>
            <th className="py-3 px-3 text-center">Name</th>
            <th className="py-3 px-3 text-center">Location</th>
            <th className="py-3 px-3 text-center">Category</th>
            <th className="py-3 px-3 text-center">Date</th>
            <th className="py-3 px-3 text-center">Quantity</th>
            <th className="py-3 px-3 text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredProducts.map((product) => (
            <ProductItem
              key={product.createdAt}
              {...product}
              deleteProduct={deleteProduct}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ProductsList;
