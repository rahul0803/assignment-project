import { SELECT_CATEGORY } from "./CategoryActions";

export const selectCategory = (category) => {
    return {
        type: SELECT_CATEGORY,
        payload: category
    }
}