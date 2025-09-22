import React, { useEffect, useReducer } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useProducts } from "../Context/ProductsContext";
import { useCategories } from "../Context/CategoriesContext";

function ProductsFrom() {
  const {setProducts} = useProducts()
  const {categories} = useCategories()
  const quantityReducer = (state, action) => {
    switch (action.type) {
      case "increment":
        if (state.count >= 5) {
          return { ...state, error: "Maximum quantity!" };
        }
        return { count: state.count + 1, error: null };

      case "decrement":
        if (state.count <= 1) {
          return { ...state, error: "Minimum quantity!" };
        }
        return { count: state.count - 1, error: null };

      case "reset":
        return { ...state, count: (state.count = 1) };

      case "clearError":
        return { ...state, error: null };

      default:
        return state;
    }
  };

  const [quantity, dispatch] = useReducer(quantityReducer, {
    count: 1,
    error: null,
  });

  useEffect(() => {
    if (quantity.error) {
      toast.error(quantity.error);
      setTimeout(() => {
        dispatch({ type: "clearError" });
      }, 0);
    }
  }, [quantity.error]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const addNewProductHandler = (data) => {
    const selectedCategory = categories.find((c) => c.name === data.category);
    const newProduct = {
      ...data,
      categoryId: selectedCategory.id,
      createdAt: new Date(),
      id: new Date().getTime(),
      quantity : quantity.count ,
    };

    setProducts((prevProducts) => [...prevProducts, newProduct]);
    reset();
    dispatch({ type: "reset" });
  };

  return (
    <section className=" bg-white/ h-auto mt-10 flex  justify-center flex-col py-4 zz:max-w-[700px] xx:max-w-[92%] ss:max-w-[90%] w-full ">
      <h2 className=" font-medium text-stone-200 zz:text-[20.5px] ww:text-[18.5px] xx:text-[17px] dd:text-[15px] ss:text-[14px]  ml-3 ">
        Add New Product
      </h2>
      <div className="bg-primary-800 h-auto flex items-start justify-start flex-col w-full my-4 ss:my-3 zz:rounded-3xl ww:rounded-2xl ss:rounded-xl  ">
        <form
          onSubmit={handleSubmit(addNewProductHandler)}
          className=" bg-red-400/ xx:py-4 ss:py-3  zz:px-5 ww:px-4 xx:px-3.5 dd:px-3 ss:px-3 flex  flex-col w-full "
        >
          <div className=" flex items-start justify-between w-full ss:flex-col dd:flex-row ">
            <div className="  flex flex-col  dd:w-2/5 ss:w-full bg-yellow-300/ dd:mr-2  ">
              <h3 className=" w-full text-leftzz:text-[17px] ww:text-[16px] xx:text-[15px] dd:text-[13px] ss:text-[12.5px] text-white mt-1 font-medium ">
                Title
              </h3>
              <input
                {...register("title", {
                  required: "Title is required!",
                  pattern: {
                    value: /^[A-Za-z\s]{4,15}$/,
                    message: "Only English - 4-15 letters!",
                  },
                })}
                className=" zz:mt-3 ww:mt-2 xx:mt-1.5 ss:mt-1 w-full  bg-transparent outline-none border-primary-500 border-2 text-stone-100  px-2 xx:py-2 dd:py-1 ss:py-1  ss:rounded-xl focus:border-primary-300 ring-0 "
                type="text"
              />
              {errors.title && (
                <span className="text-red-500 text-sm m-2 font-medium ">
                  {errors.title.message}
                </span>
              )}
            </div>
            <div className="  flex flex-col  dd:w-3/5 ss:w-full bg-yellow-300/ dd:ml-2 ss:mt-2 dd:mt-0 ">
              <h3 className=" w-full text-leftzz:text-[17px] ww:text-[16px] xx:text-[15px] dd:text-[13px] ss:text-[12.5px] text-white mt-1 font-medium ">
                Quantity
              </h3>
              <div
                id="quantityCenter"
                className=" bg-primary-800 flex items-center justify-between  zz:mt-3 ww:mt-2 xx:mt-1.5 ss:mt-1 w-full  border-primary-500 border-2 text-stone-100  px-2.5 xx:h-11 dd:h-9 ss:h-9 ss:rounded-xl "
                type="text"
              >
                <button
                  aria-label="quantity-dec"
                  type="button"
                  onClick={() => dispatch({ type: "decrement" })}
                  className="  toggleBtn cursor-pointer flex items-center justify-center p-1 rounded-full border-primary-600  "
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="#fff"
                    className="xx:size-4 ss:size-3 "
                  >
                    <path
                      stroke="#fff"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M5 12h14"
                    />
                  </svg>
                </button>
                <p
                  id="productQuantity"
                  className="  ww:text-base xx:text-[14px] dd:text-[13px] ss:text-[12px] font-medium text-stone-100 "
                >
                  {quantity.count}
                </p>
                <button
                  aria-label="quantity-inc"
                  type="button"
                  onClick={() => dispatch({ type: "increment" })}
                  className="toggleBtn cursor-pointer  flex items-center justify-center p-1 rounded-full border-primary-600  "
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="#fff"
                    className="xx:size-4 ss:size-3"
                  >
                    <path
                      stroke="#fff"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 4.5v15m7.5-7.5h-15"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>
          <div className=" dd:mt-4 ss:mt-2 flex items-start justify-between w-full ss:flex-col dd:flex-row ">
            <div className="  flex flex-col  dd:w-[52%] ss:w-full bg-yellow-300/ dd:mr-2  ">
              <h3 className=" w-full text-leftzz:text-[17px] ww:text-[16px] xx:text-[15px] dd:text-[13px] ss:text-[12.5px] text-white mt-1 font-medium ">
                Location
              </h3>
              <select
              aria-label="product-location"
                {...register("location", {
                  validate: (value) =>
                    value !== "none" || "Location is required!",
                })}
                id="productLocations"
                defaultValue="none"
                className=" form-select pr-8 pl-3 bg-no-repeat appearance-none w-full ww:text-base xx:text-[14px] ss:text-[13px] zz:mt-3 ww:mt-2 xx:mt-1.5 ss:mt-1 border-primary-500 border-2  text-stone-100 text-[15px] outline-none focus:ring-0 font-normal ss:rounded-xl ring-0 focus:border-primary-300 block xx:p-2.5 ss:p-1.5 bg-primary-800 "
              >
                <option value="none">- select location - </option>
                <option value="BDG">BDG</option>
                <option value="JKT">JKT</option>
                <option value="MLG">MLG</option>
              </select>
              {errors.location && (
                <span className="text-red-500 text-sm m-2">
                  {errors.location.message}
                </span>
              )}
            </div>
            <div className="  flex flex-col  dd:w-[50%] ss:w-full bg-yellow-300/ dd:ml-2 ss:mt-2 dd:mt-0 ">
              <h3 className=" w-full text-leftzz:text-[17px] ww:text-[16px] xx:text-[15px] dd:text-[13px] ss:text-[12.5px] text-white mt-1 font-medium ">
                Category
              </h3>
              <select
                {...register("category", {
                  validate: (value) =>
                    value !== "none" || "Category is required!",
                })}
                aria-label="category-select"
                id="ProductsSelect"
                defaultValue="none"
                className=" form-select pr-8 pl-3 bg-no-repeat appearance-none w-full ww:text-base xx:text-[14px] ss:text-[13px] zz:mt-3 ww:mt-2 xx:mt-1.5 ss:mt-1 border-primary-500 border-2  text-stone-100 text-[15px] outline-none focus:ring-0 font-normal  ss:rounded-xl ring-0 focus:border-primary-300 block xx:p-2.5 ss:p-1.5 bg-primary-800 "
              >
                <option value="none">- select category -</option>
                {categories.map((c) => {
                  return (
                    <option key={c.createdAt} value={c.name}>
                      {c.title}
                    </option>
                  );
                })}
              </select>
              {errors.category && (
                <span className="text-red-500 text-sm m-2">
                  {errors.category.message}
                </span>
              )}
            </div>
          </div>
          <div className=" bg-blue-400/ h-auto flex items-center justify-between w-full mt-6 ">
            <button
              id="addNewProductBtn"
              className=" cursor-pointer zz:text-base ww:text-[15px] xx:text-[14px] dd:text-[13px] ss:text-[12.5px] zz:py-2.5 ww:py-2 xx:py-2 ss:py-1.5 w-full py-2.5  text-main bg-primary-300 border-2 border-primary-300 duration-300 hover:bg-primary-200 hover:border-primary-200 ss:rounded-xl font-semibold "
            >
              Add Product
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}

export default ProductsFrom;
