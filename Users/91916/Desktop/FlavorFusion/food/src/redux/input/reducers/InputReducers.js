import { SEARCH_INPUT } from "../actions/InputActions";

let initialState = '';

const InputReducers = (state = initialState, action) => {
    switch (action.type) {
        case SEARCH_INPUT:
            return action.payload;                                                      // payload = search query
        default: 
            return state;
    }
}

export default InputReducers;