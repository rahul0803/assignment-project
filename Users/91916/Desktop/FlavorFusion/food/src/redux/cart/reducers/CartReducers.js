import {
  ADD_ITEM,
  REMOVE_ITEM,
  INCREMENT_QTY,
  DECREMENT_QTY,
} from "../actions/CartActions";

let initialState = [];

const CartReducers = (state = initialState, action) => {
  console.log(action)
  switch (action.type) {
    case ADD_ITEM:
      const existingItemIndex = state.findIndex(
        (item) => item.id === action.payload.id
      );
      // console.log(existingItemIndex)
      if (existingItemIndex === -1) {
        return [...state, action.payload];
      } else {
        return state.map((item) =>
          item.id === action.payload.id ? { ...item, qty: item.qty + 1 } : item
        );
      }
    case REMOVE_ITEM:
      return state.filter((item) => item.id !== action.payload.id);
    case DECREMENT_QTY:
      if(action.payload.qty == 1) return state
      return state.map((item) =>
        item.id === action.payload.id ? { ...item, qty: item.qty - 1 } : item
      );
    case INCREMENT_QTY:
      return state.map((item) =>
        item.id === action.payload.id ? { ...item, qty: item.qty + 1 } : item
      );
    default:
      return state;
  }
};

export default CartReducers;
