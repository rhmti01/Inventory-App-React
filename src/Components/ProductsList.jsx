import React, { useMemo } from "react";
import ProductItem from "./ProductItem";

function ProductsList({ products, searchValue, sortValue }) {
  const filteredAndSortedProducts = useMemo(() => {
    const normalizedSearchTerm = searchValue.toLowerCase().trim();

    // Filter
    let result = products.filter((product) =>
      product.title.toLowerCase().includes(normalizedSearchTerm)
    );

    // Sort
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

    return result;
  }, [products, searchValue, sortValue]);

  if (filteredAndSortedProducts.length < 1) {
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
        <thead className="bg-[#1b2127] text-white font-medium ww:text-[16px] xx:text-[15.5px] dd:text-[14.5px] ss:text-[13.5px]">
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
          {filteredAndSortedProducts.map((product) => (
            <ProductItem key={product.createdAt} {...product} />
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ProductsList;
