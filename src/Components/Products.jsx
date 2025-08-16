import React, { useState } from "react";
import ProductsList from "./ProductsList";
import { useProducts } from "../Context/ProductsContext";

function Products() {
  const {products , setProducts} = useProducts()
  const [searchValue, setSearchValue] = useState("");
  const [sortValue, setSortValue] = useState("newest");
  console.log(products.length);

  return (
    <section className="mt-10 mb-32 flex items-start justify-center flex-col w-full mx-auto zz:max-w-[700px] ww:max-w-[92%] xx:max-w-[94%] ss:w-[90%]">
      {/* Title */}
      <h2 className="text-left text-white zz:text-[20.5px] ww:text-[18.5px] xx:text-[17px] dd:text-[15px] ss:text-[14px] font-medium ml-1">
        Products List
      </h2>

      {/* Search & Sort */}
      <div className="flex items-center justify-between w-full mt-5 gap-3">
        <input
          type="text"
          placeholder="Search..."
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          className="ww:text-base xx:text-[15px] dd:text-[14px] ss:text-[13px] zz:w-52 ww:w-40 dd:w-32 xx:w-28 ss:w-24 bg-transparent outline-none border-primary-500 border-2 text-stone-100 xx:px-3 xx:py-2 dd:px-2 dd:py-1.5 ss:p-1.5 ss:rounded-xl focus:border-primary-300 ring-0 "
        />
        <select
          id="sort"
          value={sortValue}
          onChange={(e) => setSortValue(e.target.value)}
          className="form-select pr-8 pl-3 bg-no-repeat appearance-none zz:w-32 ww:w-28 xx:w-24 dd:w-24 ss:w-20 border-primary-500 border-2 text-stone-100 xx:text-[15px] dd:text-[13px] ss:text-[12px] outline-none focus:ring-0 font-normal ss:rounded-xl focus:border-primary-300 block xx:p-2.5 dd:p-2 ss:p-1.5 bg-[#1A262D]"
        >
          <option value="newest">Newst</option>
          <option value="oldest">Oldest</option>
          <option value="A-Z">A-Z</option>
          <option value="Z-A">Z-A</option>
        </select>
      </div>

      {/* products list */}
      <ProductsList
        products={products}
        setProducts={setProducts}
        searchValue={searchValue}
        sortValue={sortValue}
      />
    </section>
  );
}

export default Products;
