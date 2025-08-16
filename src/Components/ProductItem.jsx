import React from "react";
import { Edit, Trash } from "iconsax-react";

function ProductItem({ createdAt, title, location, category, quantity , id , deleteProduct}) {
  console.log(createdAt);

  return (
    <tr className="border-t-[1px] border-zinc-600 bg-[#1c232c] text-white ww:text-[15.5px] xx:text-[15px] dd:text-[14px] ss:text-[13px]">
      <td className="py-3 px-3 text-center whitespace-nowrap overflow-hidden truncate">
        {title}
      </td>
      <td className="py-3 px-3 text-center whitespace-nowrap overflow-hidden truncate">
        {location}
      </td>
      <td className="py-3 px-3 text-center whitespace-nowrap overflow-hidden truncate">
        {category}
      </td>
      <td className="py-3 px-3 text-center whitespace-nowrap overflow-hidden truncate">
        {new Date(createdAt).toLocaleDateString()}
      </td>
      <td className="text-center whitespace-nowrap overflow-hidden truncate  ">
        {quantity}
      </td>
      <td className="flex justify-center items-center gap-x-3 pt-3 pl-2 ">
        {/* <Edit className="size-5 stroke-zinc-300 cursor-pointer hover:scale-110 transition-transform" /> */}
        <Trash onClick={()=>deleteProduct(Number(id))} className="size-5 stroke-red-500 cursor-pointer hover:scale-110 transition-transform" />
      </td>
    </tr>
  );
}

export default ProductItem;
