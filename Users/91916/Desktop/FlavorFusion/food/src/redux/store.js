import { createStore } from 'redux';
import InputReducers from './input/reducers/InputReducers';
import CategoryReducer from './category/reducers/CategoryReducer';
import CartReducers from './cart/reducers/CartReducers';
import { combineReducers } from 'redux';

const rootReducers = combineReducers({
    input: InputReducers,
    category: CategoryReducer,
    cart: CartReducers
})

export const store = createStore(rootReducers);