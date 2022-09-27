import {
    GET_ANSWER_LIST,
    CREATE_ANSWER_ITEM,
    UPDATE_ANSWER_ITEM,
    DELETE_ANSWER_ITEM,
    UPDATE_ANSWER_VOTE,
    SORT_ANSWER_LIST,
    UPDATE_ANSWER_RATE,
} from "../Actions/answerActions";

export const SORT_BY_DATE_ASC = "SORT_BY_DATE_ASC";
export const SORT_BY_DATE_DSC = "SORT_BY_DATE_DSC";
export const SORT_BY_VOTES_ASC = "SORT_BY_VOTES_ASC";
export const SORT_BY_VOTES_DSC = "SORT_BY_VOTES_DSC";
export const SORT_BY_RATE_ASC = "SORT_BY_RATE_ASC";
export const SORT_BY_RATE_DSC = "SORT_BY_RATE_DSC";

const initialState={
    answerList: [],
    sortOption: SORT_BY_DATE_ASC,
}

const answerReducer = (state = initialState, {type, payload}) => {
    switch (type) {

        case GET_ANSWER_LIST:
            return {
                ...state,
                answerList: payload
            };

        case CREATE_ANSWER_ITEM:
            return {
                ...state,
                answerList: [...state.answerList, payload]
            };

        case UPDATE_ANSWER_ITEM:
            return {
                ...state,
                answerList: state.answerList.map(item =>
                    item.id === payload.id ? payload : item
                )
            };

        case DELETE_ANSWER_ITEM:
            return {
                ...state,
                answerList: state.answerList.filter(item =>
                    item.id !== payload.id && item.questionId === payload.questionId
                )
            };

        case UPDATE_ANSWER_VOTE:
            const answerItem = state.answerList.find(item =>
                item.id === payload.answerId);
            const newAnswerItem = {
                ...answerItem,
                voteCount: answerItem.voteCount + 1
            }
            const answerListFiltered = state.answerList.filter(item =>
                item.id !== payload.answerId
            )
            return {
                ...state,
                answerList: getOrderedList([...answerListFiltered, newAnswerItem], state.sortOption)
            };

        case UPDATE_ANSWER_RATE:
            const answerRateItem = state.answerList.find(item =>
                item.id === payload.answerId);
            const newAnswerRateItem = {
                ...answerRateItem,
                ratingCount: payload.ratingCount,
                ratingAverage: payload.ratingAverage
            }
            const answerRateListFiltered = state.answerList.filter(item =>
                item.id !== payload.answerId
            )
            return {
                ...state,
                answerList: getOrderedList([...answerRateListFiltered, newAnswerRateItem], state.sortOption)
            };


        case SORT_ANSWER_LIST:
            return {
                ...state,
                sortOption: payload,
                answerList: getOrderedList(state.answerList, payload)
            }

        default:
            return state;
    }
}

function getOrderedList(answerListOriginal, sortOption) {

    switch (sortOption) {

        case SORT_BY_DATE_ASC:
            return answerListOriginal.sort((a, b) =>
                (a.updatedAt.toLowerCase() > b.updatedAt.toLowerCase()) ? 1 : -1);

        case SORT_BY_DATE_DSC:
            return answerListOriginal.sort((a, b) =>
                (a.updatedAt.toLowerCase() > b.updatedAt.toLowerCase()) ? -1 : 1);

        case SORT_BY_VOTES_ASC:
            return answerListOriginal.sort((a, b) =>
                (a.voteCount > b.voteCount) ? 1 : -1);

        case SORT_BY_VOTES_DSC:
            return answerListOriginal.sort((a, b) =>
                (a.voteCount > b.voteCount) ? -1 : 1);

        case SORT_BY_RATE_ASC:
            return answerListOriginal.sort((a, b) =>
                (a.ratingAverage > b.ratingAverage) ? 1 : -1);

        case SORT_BY_RATE_DSC:
            return answerListOriginal.sort((a, b) =>
                (a.ratingAverage > b.ratingAverage) ? -1 : 1);

        default: //returns the original list without change.
            return answerListOriginal;
    }
}

export default answerReducer;
