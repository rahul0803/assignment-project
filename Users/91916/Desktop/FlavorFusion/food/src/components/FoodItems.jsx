import { useSelector } from "react-redux";
import FoodData from "../data/FoodData";
import FoodCard from "./FoodCard";

import toast, { Toaster } from 'react-hot-toast'


const FoodItems = () => {
  const category = useSelector((state) => state.category);
  // console.log(category);                                                                     // initial category = All

  const input = useSelector((state) => state.input);

  const handleToast = (name) => toast.success(`${name} added to cart`)

  return (
    <>
    <Toaster position="top-center" reverseOrder={false} />
    <div className="flex flex-wrap gap-10 justify-center lg:justify-start mx-6 my-10">
      {
        input.trim() === ""
        ? category === "All"
          ? FoodData?.map((item) => <FoodCard item={item} key={item.id} handleToast={handleToast} />)
          : FoodData?.filter((item) => item.category === category).map(
              (item) => <FoodCard item={item} key={item.id} handleToast={handleToast} />
            )
        : null                                                                                // if input.trim() === '' is false then 'null'
      }

      {
        input.trim() !== ""
        ? category === "All"
          ? FoodData?.filter(
              (item) =>
                item.name.toLowerCase().indexOf(input.toLowerCase()) !== -1
            ).map((item) => <FoodCard item={item} key={item.id} handleToast={handleToast} />)
          : FoodData?.filter((item) => item.category === category)
              .filter(
                (item) =>
                  item.name.toLowerCase().indexOf(input.toLowerCase()) !== -1
              )
              .map((item) => <FoodCard item={item} key={item.id} handleToast={handleToast} />)
        : null
      }
    </div>
    </>
  );
};

export default FoodItems;
