export const FILTER_CATEGORY = "FILTER_BY_CATEGORY"
export const FILTER_RATING = "FILTER_BY_RATING"

export function handleFilterCategory(payload){
    return{
        type: FILTER_CATEGORY,
        payload
    }
}
export function handleSortRating(payload){
    return{
        type: FILTER_RATING,
        payload
    }
}