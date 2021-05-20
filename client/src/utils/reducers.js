import {
    ADD_TO_WISHLIST,
    ADD_MULTIPLE_TO_WISHLIST,
    ADD_MULTIPLE_TO_SECRET_LIST,
    ADD_TO_SHOPPING_LIST,
    UPDATE_SECRET_LIST_ITEM,
    ADD_MULTIPLE_TO_SHOPPING_LIST
} from './actions';

const initialState = {
    wishlist: [],
    secretList: [],
    shoppingList: []
};

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
        
        case UPDATE_SECRET_LIST_ITEM:
            return {
                ...state,
                secretList: [...state.secretList, action.item]
            };
        // ============ SECRET LIST CASES END =======================================================

        // =========== SHOPPING LIST CASES START =================================================
        case ADD_TO_SHOPPING_LIST:
            return {
                ...state,
                shoppingList: [...state.shoppingList, action.item]
            };
        
        case ADD_MULTIPLE_TO_SHOPPING_LIST:
            return {
                ...state,
                shoppingList: [...state.shoppingList, ...action.items]
            };
        // =========== SHOPPING LIST CASES END

        // if it's none of these actions, do not update the state at all and keep things the same!
        default:
            return state;
    }
};

export default reducer;