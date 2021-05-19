import {
    ADD_TO_WISHLIST,
    ADD_MULTIPLE_TO_WISHLIST,
    ADD_MULTIPLE_TO_SECRET_LIST
} from './actions';

const initialState = {
    wishlist: [],
    secretList: []
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        // ============ WISHLIST CASES START ===================================================
        case ADD_TO_WISHLIST:
            return {
                ...state,
                wishlist: [...state.wishlist, action.item]
            };

        case ADD_MULTIPLE_TO_WISHLIST:
            return {
                ...state,
                wishlist: [...state.wishlist, ...action.items]
            };
        // ============ WISHLIST CASES END =======================================================

        // ============= SECRET LIST CASES START =====================================================
        case ADD_MULTIPLE_TO_SECRET_LIST:
            return {
                ...state,
                secretList: [...state.secretList, ...action.items]
            };
        // ============ SECRET LIST CASES END =======================================================

        // if it's none of these actions, do not update the state at all and keep things the same!
        default:
            return state;
    }
};

export default reducer;