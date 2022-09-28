import { FILTER_RATING, FILTER_CATEGORY, FILTER_CATEGORY2 } from "../../constants"

export function FilterCategory(payload){
    return{
        type: FILTER_CATEGORY,
        payload
    }
}
export function FilterCategory2(payload){
    return{
        type: FILTER_CATEGORY2,
        payload
    }
}
export function SortRating(payload){
    return{
        type: FILTER_RATING,
        payload
    }
}