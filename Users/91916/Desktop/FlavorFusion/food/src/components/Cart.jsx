
import { IoClose } from "react-icons/io5";
import CartItems from "./CartItems";
import { FaShoppingCart } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { useState, useMemo, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from 'react-hot-toast';
import './cart.css';
import { addItem } from "../redux/cart/actions/CartActionCreators";

const Cart = () => {
  const [activeCart, setActiveCart] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const cartDetails = useSelector((state) => state.cart);
  // console.log(cartDetails)                                                       // [] when this component mounts for the 1st time
  const noOfItems = cartDetails.length;

  const totalPrice = useMemo(() => {
    return cartDetails.reduce((total, item) => total + item.qty * item.price, 0);
  }, [cartDetails]);

  const handleToast = (name) => toast.error(`${name} removed from cart`);

  // Function to retrieve items from local storage and add them to the Redux store
  const loadItemsFromLocalStorage = () => {
    const storedItems = localStorage.getItem('cartItems');
    // console.log(storedItems)
      if (storedItems) {
        const parsedItems = JSON.parse(storedItems);
        parsedItems.forEach(item => {
            dispatch(addItem(item));
        });
      }
  };

  // Load items from local storage when the component mounts
  useEffect(() => {
    loadItemsFromLocalStorage();
  }, []);

  // Sync cart with local storage whenever cart details change
  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(cartDetails));
  }, [cartDetails]);                                                               // useful in 'Add to cart' btn and then if we refresh 

  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      <div
        className={`fixed right-0 top-0 w-full lg:w-[20vw] bg-white h-full p-5 ${
          activeCart ? "translate-x-0" : "translate-x-full"
        } transition-all duration-500 z-50 flex flex-col`}
      >
        <div className="flex justify-between items-center my-3">
          <span className="text-xl font-bold text-gray-800">My Orders</span>
          <IoClose
            className="border-2 border-gray-600 text-gray-600 font-bold p-1 text-xl rounded-md hover:text-red-300 hover:border-red-300 cursor-pointer"
            onClick={() => setActiveCart(!activeCart)}
            aria-label="Close cart"
          />
        </div>

        <div className="flex-grow overflow-y-auto mb-20 custom-scrollbar">
          {cartDetails && cartDetails.length > 0 ? (
            cartDetails.map((item) => (
              <CartItems
                key={item.id}
                name={item.name}
                price={item.price}
                img={item.img}
                qty={item.qty}
                id={item.id}
                handleToast={handleToast}
              />
            ))
          ) : (
            <h2 className="text-center text-xl font-bold text-gray-800 pt-10">
              Your cart is empty
            </h2>
          )}
        </div>

        <div className="fixed bottom-0 left-0 right-0 bg-white p-5 shadow-lg lg:w-[20vw] w-full"> 
          <h3 className="font-semibold text-gray-800">Items: {noOfItems}</h3>
          <h3 className="font-semibold text-gray-800">Total Amount: {totalPrice}</h3>
          <hr className="my-2" />
          <button
            className="bg-green-500 font-bold px-3 text-white py-2 rounded-lg w-full"
            onClick={() => navigate('/success')}
            aria-label="Checkout"
          >
            Checkout
          </button>
        </div>
      </div>

      <FaShoppingCart
        className={`rounded-full bg-white shadow-md text-5xl p-3 fixed bottom-4 right-4 ${
          noOfItems > 0 ? 'animate-bounce delay-500 transition-all' : ''
        }`}
        onClick={() => setActiveCart(!activeCart)}
        aria-label="Open cart"
      />
    </>
  );
};

export default Cart;







