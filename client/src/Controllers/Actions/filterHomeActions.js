import { FILTER_RATING, FILTER_CATEGORY } from "../../constants"

export function FilterCategory(payload){
    return{
        type: FILTER_CATEGORY,
        payload
    }
}
export function FilterCategory2(payload){
    return{
        type: FILTER_CATEGORY,
        payload
    }
}
export function SortRating(payload){
    return{
        type: FILTER_RATING,
        payload
    }
}