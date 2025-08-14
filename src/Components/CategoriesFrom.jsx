import { Category } from "iconsax-react";
import React from "react";
import { useForm } from "react-hook-form";

function CategoriesFrom({  categories , setCategories }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const addNewCategoryHandler = (data) => {
    const newCategory = {
      ...data,
      name: data.title,
      createdAt: new Date().toISOString(),
      id : new Date().getTime()
    };

    setCategories((prevCategories) => [...prevCategories, newCategory]);
    reset();
  };
  console.log(categories);

  return (
    <section className=" bg-white/ h-auto mt-16 flex  justify-center flex-col zz:py-4 ww:py-3 zz:max-w-[600px] xx:max-w-[92%] ss:max-w-[90%] w-full ">
      <a className=" font-medium text-stone-200 zz:text-[21px] ww:text-[19px] xx:text-[17px] dd:text-[15px] ss:text-[14px] text-left ml-3  ">
        Add New Category
      </a>
      <form
        onSubmit={handleSubmit(addNewCategoryHandler)}
        className="bg-primary-800 h-auto flex items-start justify-start flex-col w-full xx:my-4 ss:my-3 zz:rounded-3xl ww:rounded-2xl xx:rounded-xl ss:rounded-lg "
      >
        <div className=" bg-red-400/ xx:py-4 ss:py-3 zz:px-5 ww:px-4 xx:px-3.5 ss:px-3 flex  flex-col w-full ">
          <div className="  flex flex-col  w-full bg-yellow-300/ ">
            <h3 className=" w-full text-left zz:text-[17px] ww:text-[16px] xx:text-[15px] dd:text-[13px] ss:text-[12.5px] text-white mt-1 font-medium ">
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
              aria-invalid={errors.title ? "true" : "false"}
              className=" zz:mt-3 ww:mt-2 xx:mt-1.5 ss:mt-1 xx:text-base dd:text-[14px] ss:text-[12.5px] zz:w-52 xx:w-44 bg-transparent outline-none border-primary-500 border-2 text-stone-100  px-2 py-1.5 xx:rounded-xl ss:rounded-lg focus:border-primary-300 ring-0 "
              type="text"
            />
            {errors.title && (
              <span className="text-red-500 mm:text-[13px] xx:text-[14px] xl:text-[14.5px] text-left block text-sm m-2">
                {errors.title.message}
              </span>
            )}
          </div>
          <div className="  flex flex-col  w-full bg-yellow-300/ mt-4 pb-2 ">
            <h3 className=" w-full text-left zz:text-[17px] ww:text-[16px] xx:text-[15px] dd:text-[13px] ss:text-[12.5px] text-white mt-1 font-medium ">
              Description
            </h3>
            <input
              cols="1"
              {...register("description", {
                required: "Description is required!",
                pattern: {
                  value: /^[A-Za-z\s]{8,30}$/,
                  message: "Only English - 4-30 letters!",
                },
              })}
              className=" resize-none zz:mt-3 ww:mt-2 xx:mt-1.5 ss:mt-1  w-full  xx:text-base dd:text-[14px] bg-transparent outline-none border-primary-500 border-2 text-stone-100  px-2 py-2 xx:rounded-xl ss:rounded-lg focus:border-primary-300 ring-0 "
              type="text"
            ></input>
            {errors.description && (
              <span className="text-red-500 mm:text-[13px] xx:text-[14px] xl:text-[14.5px] text-left block text-sm m-2  ">
                {errors.description.message}
              </span>
            )}
          </div>
          <div className=" bg-blue-400/ h-auto flex items-center justify-between w-full xx:mt-4 ss:mt-3 ">
            <button
              id="categoryAddNewBtn"
              className=" cursor-pointer zz:text-base ww:text-[15px] xx:text-[14px] dd:text-[13px] ss:text-[12.5px] zz:py-2.5 ww:py-2 xx:py-2 ss:py-1.5 w-full py-2.5  text-main bg-primary-300 border-2 border-primary-300 hover:bg-primary-200  duration-300 hover:border-primary-200 xx:rounded-xl ss:rounded-lg font-semibold  "
            >
              Add Category
            </button>
          </div>
        </div>
      </form>
    </section>
  );
}

export default CategoriesFrom;
