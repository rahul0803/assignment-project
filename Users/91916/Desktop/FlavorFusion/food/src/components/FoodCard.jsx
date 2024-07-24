
import { FaStar } from "react-icons/fa";
import { addItem } from "../redux/cart/actions/CartActionCreators";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const FoodCard = ({ item, handleToast }) => {
  // console.log(item);

const dispatch = useDispatch();
const navigate = useNavigate();

function handleClick(id) {
  navigate(`/details/${id}`);
}

function handleAddToCart() {
  dispatch(addItem({...item, qty: 1}))
  handleToast(item?.name)

  // Retrieving existing items from local storage
  const storedItems = localStorage.getItem('cartItems') 
  const existingItems = storedItems ? JSON.parse(storedItems) : [];

  // // Updating the array of items in local Storage
  // const updatedItems = [...existingItems, item]
  // saveItemsToLocalStorage(updatedItems)

  // Check if item already exists in the cart
    const existingItemIndex = existingItems.findIndex(cartItem => cartItem.id === item.id);

    if (existingItemIndex >= 0) {
      // Increment quantity if item already exists
      existingItems[existingItemIndex].qty += 1;
    } else {
      // Add new item to the cart
      existingItems.push({ ...item, qty: 1 });
    }

    // Update localStorage with new cart items
    saveItemsToLocalStorage(existingItems);
}

function saveItemsToLocalStorage(items) {
localStorage.setItem('cartItems', JSON.stringify(items))
}

  return (
    <div className="font-bold w-[250px] bg-white p-5 flex flex-col rounded-lg gap-2 shadow-xl">
      <img
        src={item?.img}
        alt={item?.name}
        className="w-auto h-[130px] hover:scale-110 cursor-grab transition-all duration-500 ease-in-out"
      />

      <div className="text-sm flex justify-between">
        <h2 onClick={(e) => {
          handleClick(item?.id)
          e.stopPropagation()
          }} className="cursor-pointer">{item?.name}</h2>
        <span className="text-orange-500">₹{item?.price}</span>
      </div>

      <p className="text-sm font-normal">{item?.desc.slice(0, 50)}...</p>

      <div className="flex justify-between">
      <span className="flex justify-center items-center"> <FaStar className="mr-1 text-yellow-400"/>{item?.rating}</span>
        <button className="p-1.5 text-white
        bg-orange-500 hover:bg-orange-600 
        rounded-lg text-sm"
        onClick={(e) => {
          handleAddToCart()
        }}
        >Add to Cart</button>
      </div>
    </div>
  );
};

export default FoodCard;

