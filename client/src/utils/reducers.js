import {

} from './actions';

const initialState = {
    wish_list: []
}

const reducer = (state = initialState, action) => {
    switch (action.type) {


        // if it's none of these actions, do not update the state at all and keep things the same!
        default:
            return state;
    }
};

export default reducer;