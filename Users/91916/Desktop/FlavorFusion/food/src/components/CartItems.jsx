
import { FaPlus, FaMinus } from "react-icons/fa6";
import { MdDelete } from "react-icons/md";
import { useDispatch } from "react-redux";
import { removeItem, decrementQty, incrementQty } from "../redux/cart/actions/CartActionCreators";

const CartItems = ({ name, price, img, qty, id, handleToast }) => {
  const dispatch = useDispatch();

  function removeFromStorage() {
    const storedItems = localStorage.getItem('cartItems');
    const existingItems = storedItems ? JSON.parse(storedItems) : [];
    const updatedItems = existingItems.filter(item => item.id !== id);
    saveItemsToLocalStorage(updatedItems);
  }

  function saveItemsToLocalStorage(items) {
    localStorage.setItem('cartItems', JSON.stringify(items));
  }

  function updateQtyInStorage(id, newQty) {
    const storedItems = localStorage.getItem('cartItems');
    const existingItems = storedItems ? JSON.parse(storedItems) : [];
    const updatedItems = existingItems.map(item => 
      item.id === id ? { ...item, qty: newQty } : item
    );
    saveItemsToLocalStorage(updatedItems);
    // console.log("Updated items in local storage:", updatedItems);                      
  }

  return (
    <div className="flex gap-2 shadow-md rounded-lg p-2 mb-3 items-center relative">
      <img src={img} alt="food-image" className="w-[50px] h-[50px] object-cover" />
      <div className="leading-5 flex-1">
        <h2 className="font-bold text-gray-800">{name}</h2>

        <div className="flex justify-between items-center">
          <span className="text-green-500 font-bold">₹{price}</span>
          <div className="flex items-center gap-2">
            <FaMinus 
              className="border-2 border-gray-600 text-gray-600 hover:text-white hover:bg-green-500 hover:border-none rounded-md p-1 text-xl transition-all ease-linear cursor-pointer" 
              onClick={() => {
                // console.log("Decrementing qty for item:", id, qty);                 // Debugging log
                dispatch(decrementQty({ id, qty }));
                updateQtyInStorage(id, qty - 1);
              }}
            />
            <span>{qty}</span>
            <FaPlus 
              className="border-2 border-gray-600 text-gray-600 hover:text-white hover:bg-green-500 hover:border-none rounded-md p-1 text-xl transition-all ease-linear cursor-pointer" 
              onClick={() => {
                // console.log("Incrementing qty for item:", id, qty);                // Debugging log
                dispatch(incrementQty({ id, qty }));
                updateQtyInStorage(id, qty + 1);
              }}
            />
          </div>
        </div>
      </div>
      
      <MdDelete
        className="text-gray-600 cursor-pointer"
        onClick={() => {
          console.log("Removing item from cart:", id); // Debugging log
          dispatch(removeItem({ name, price, img, qty, id }));
          handleToast(name);
          removeFromStorage();
        }}
      />
    </div>
  );
};

export default CartItems;



  

  