
import { useParams, useNavigate } from "react-router-dom";
import FoodData from "../../data/FoodData";

const Details = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // Find the food item based on the id parameter
  const item = FoodData?.find((item) => item.id === parseInt(id));          // returns d 1st elem that matches the condition or else 'undefined'
  console.log(item)                                                         // item object with info

  // Check if item exists
  if (!item) {
    return (
      <div className="container mx-auto py-10 text-center">
        <h2 className="text-2xl font-bold text-black-600">Food item not found!</h2>
        <button className="mt-4 p-4 font-bold text-lg bg-blue-500 text-white rounded-lg" onClick={() => navigate('/')}>
          Back to Home
        </button>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-10 lg:grid lg:grid-cols-2 lg:gap-10">
      <div className="lg:order-2">
        <div className="w-full overflow-hidden rounded-xl group">
          <img
            src={item.img}
            alt={item.name}
            className="w-full h-auto lg:w-full lg:h-96"
          />
        </div>
      </div>

      <div className="lg:order-1">
        <div className="flex flex-col gap-3">
          <h3 className="font-bold text-2xl truncate text-black lg:text-3xl">{item.name}</h3>
          <span className="text-sm text-cyan-700 font-medium lg:text-base">{item.desc}</span>
          <p className="text-2xl font-semibold text-black">{item.category}</p>
        </div>

        <div className="mx-auto lg:mx-0 lg:text-left">
          <button className="mt-4 p-4 font-bold text-lg bg-blue-500 text-white rounded-lg" onClick={() => navigate('/')}>
            Back to Home
          </button>
        </div>
      </div>
    </div>
  );
};

export default Details;
