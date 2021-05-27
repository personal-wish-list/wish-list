import {
    ADD_USER_AS_FRIEND,
    REMOVE_USER_AS_FRIEND,

    ADD_A_WISHLIST,
    ADD_TO_WISHLIST,
    ADD_MULTIPLE_TO_WISHLIST,
    SORT_WISHLIST_ALPHABETICALLY,
    SORT_WISHLIST_PRICE_ASC,
    SORT_WISHLIST_PRICE_DESC,
    UPDATE_WISHLIST_ITEM,
    REMOVE_FROM_WISHLIST,

    ADD_TO_SECRET_LIST,
    ADD_MULTIPLE_TO_SECRET_LIST,
    SORT_SECRET_LIST_ALPHABETICALLY,
    SORT_SECRET_LIST_PRICE_ASC,
    SORT_SECRET_LIST_PRICE_DESC,
    UPDATE_SECRET_LIST_ITEM,
    REMOVE_FROM_SECRET_LIST,

    ADD_TO_SHOPPING_LIST,
    ADD_MULTIPLE_TO_SHOPPING_LIST,
    UPDATE_SHOPPING_LIST_ITEM,
    REMOVE_FROM_SHOPPING_LIST
} from './actions';

const initialState = {
    friends: [],
    wishlists: [],
    wishlist: [],
    secretList: [],
    shoppingList: []
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        // ================ FRIEND CASES START ==================================================
        case ADD_USER_AS_FRIEND:
            return {
                ...state,
                friends: [...state.friends, action.friend]
            };

        case REMOVE_USER_AS_FRIEND:
            const newFriendsList = state.friends.filter(friend => {
                return friend._id !== action._id;
            });

            return {
                ...state,
                friends: newFriendsList
            }
        // =============== FRIEND CASES END =====================================================

        // ============ WISHLIST CASES START ===================================================
        case ADD_A_WISHLIST:
            return {
                ...state,
                wishlists: [...state.wishlists, action.wishlist]
            };
        
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
        
        case SORT_WISHLIST_ALPHABETICALLY:
            let abcWishlist = state.wishlist.sort((a, b) => {
                if (a.name < b.name) return -1;
                if (a.name > b.name) return 1;
                return 0;
            });

            return {
                ...state,
                wishlist: abcWishlist
            }

        case SORT_WISHLIST_PRICE_ASC:
            let priceAscWishlist = state.wishlist.sort((a, b) => {
                return parseFloat(a.price) - parseFloat(b.price);
            });

            return {
                ...state,
                wishlist: priceAscWishlist
            };

        case SORT_WISHLIST_PRICE_DESC:
            let priceDescWishlist = state.wishlist.sort((a, b) => {
                return parseFloat(b.price) - parseFloat(a.price);
            });

            return {
                ...state,
                wishlist: priceDescWishlist
            };

        case UPDATE_WISHLIST_ITEM:
            return {
                ...state,
                wishlist: [...state.wishlist, action.item]
            };

        case REMOVE_FROM_WISHLIST:
            let newWishlist = state.wishlist.filter(item => {
                return item._id !== action._id;
            });

            return {
                ...state,
                wishlist: newWishlist
            };
        // ============ WISHLIST CASES END =======================================================

        // ============= SECRET LIST CASES START =====================================================
        case ADD_TO_SECRET_LIST:
            return {
                ...state,
                secretList: [...state.secretList, action.item]
            };

        case ADD_MULTIPLE_TO_SECRET_LIST:
            return {
                ...state,
                secretList: [...action.items]
            };

        case SORT_SECRET_LIST_ALPHABETICALLY:
            let abcSecretList = state.secretList.sort((a, b) => {
                if (a.name < b.name) return -1;
                if (a.name > b.name) return 1;
                return 0;
            });

            return {
                ...state,
                secretList: abcSecretList
            }

        case SORT_SECRET_LIST_PRICE_ASC:
            let priceAscSecretList = state.secretList.sort((a, b) => {
                return parseFloat(a.price) - parseFloat(b.price);
            });

            return {
                ...state,
                secretList: priceAscSecretList
            };

        case SORT_SECRET_LIST_PRICE_DESC:
            let priceDescSecretList = state.secretList.sort((a, b) => {
                return parseFloat(b.price) - parseFloat(a.price);
            });

            return {
                ...state,
                secretList: priceDescSecretList
            };

        case UPDATE_SECRET_LIST_ITEM:
            return {
                ...state,
                secretList: [...state.secretList, action.item]
            };

        case REMOVE_FROM_SECRET_LIST:
            let newSecretList = state.secretList.filter(item => {
                return item._id !== action._id;
            });

            return {
                ...state,
                secretList: newSecretList
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

        case UPDATE_SHOPPING_LIST_ITEM:
            return {
                ...state,
                shoppingList: [...state.shoppingList, action.item]
            };

        case REMOVE_FROM_SHOPPING_LIST:
            let newShoppingList = state.shoppingList.filter(item => {
                return item._id !== action._id;
            });

            return {
                ...state,
                shoppingList: newShoppingList
            };
        // =========== SHOPPING LIST CASES END ========================================================

        // if it's none of these actions, do not update the state at all and keep things the same!
        default:
            return state;
    }
};

export default reducer;