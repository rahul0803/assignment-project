import { SELECT_CATEGORY } from "../actions/CategoryActions";

let initialState = 'All';

const CategoryReducer = (state = initialState, action) => {
    switch (action.type) {
        case SELECT_CATEGORY:
            return action.payload
        default:
            return state;
    }
}

export default CategoryReducer;