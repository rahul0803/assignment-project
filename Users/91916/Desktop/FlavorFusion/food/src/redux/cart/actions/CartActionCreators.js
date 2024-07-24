import { ADD_ITEM, REMOVE_ITEM, INCREMENT_QTY, DECREMENT_QTY } from "./CartActions";

export const addItem = (item) => {
    // console.log(item)
    return {
    type: ADD_ITEM,
    payload: item                                                                           
    }
}

export const removeItem = (item) => {
    return {
        type: REMOVE_ITEM,
        payload: item
    }
}

export const incrementQty = (item) => {
    return {
        type: INCREMENT_QTY,
        payload: item
    }
}

export const decrementQty = (item) => {
    return {
        type: DECREMENT_QTY,
        payload: item
    }
}