import { Toaster } from "react-hot-toast";
import "./index.css";
import CategoriesFrom from "./Components/CategoriesFrom";
import ProductsFrom from "./Components/ProductsFrom";
import Products from "./Components/Products";
import ProductsProvider from "./Context/ProductsContext";
import { CategoriesProvider } from "./Context/CategoriesContext";

function App() {

  return (
    <ProductsProvider>
      <CategoriesProvider>
        <div className="font-outfit bg-primary-900   flex items-center justify-start flex-col w-full ">
          <div className="  mt-14  flex items-center justify-center ">
            <h1 className=" leading-9 text-zinc-100 zz:text-4xl  ww:text-[28px] xx:text-2xl dd:text-[22px] mx-4  ss:text-xl text-wrap text-center w-full font-bold  ">
              Inventory App React
            </h1>
          </div>
          <CategoriesFrom
          />
          <ProductsFrom
          />
          <Products />
          <Toaster />
        </div>
      </CategoriesProvider>
    </ProductsProvider>
  );
}

export default App;
