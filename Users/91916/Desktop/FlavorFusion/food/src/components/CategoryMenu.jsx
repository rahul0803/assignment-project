import FoodData from "../data/FoodData";
import { selectCategory } from "../redux/category/actions/CategoryActionsCreator";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";


const CategoryMenu = () => {
  const arr = FoodData.map((item) => item.category);                                  // getting all the categories
  const uniqueCategoriesArr = [...new Set(arr)];
  // console.log(uniqueCategoriesArr)                                                // ['Lunch', 'Breakfast', 'Dinner', 'Snacks']

  const dispatch = useDispatch();
  const category = useSelector((state) => state.category);

  return (
    <div className="ml-6">
      <h3 className="text-xl font-semibold">Find the Best Food</h3>

      <div className="my-5 flex gap-3 overflow-x-scroll scroll-smooth lg:overflow-x-hidden custom-scrollbar">
        <button
          className={`px-3 py-2 text-center bg-gray-200 font-bold rounded-lg hover:bg-orange-500 hover:text-white ${
            category === "All" && "bg-orange-500 text-white"
          }`}
          onClick={() => dispatch(selectCategory("All"))}
        > 
          All
        </button>

        {
          uniqueCategoriesArr && uniqueCategoriesArr.length > 0
          ? uniqueCategoriesArr.map((item, index) => (
              <button
                key={item}
                className={`px-3 py-2 text-center bg-gray-200 font-bold rounded-lg hover:bg-orange-500 hover:text-white ${
                  item === category && "bg-orange-500 text-white"
                }`}
                onClick={() => dispatch(selectCategory(item))}
              >
                {item}
              </button>
            ))
          : null
        }
      </div>
    </div>
  );
};

export default CategoryMenu;
