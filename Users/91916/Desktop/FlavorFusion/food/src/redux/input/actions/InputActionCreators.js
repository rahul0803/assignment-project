import { SEARCH_INPUT } from "./InputActions"

export const searchInput = (value) => {
    return {
        type: SEARCH_INPUT,
        payload: value
    }
}