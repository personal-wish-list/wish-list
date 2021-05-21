import React, { useEffect } from "react";
import './shopping-list.css';

import WishListItem from '../../components/WishListItem/WishListItem';

import { useSelector, useDispatch } from 'react-redux';
import { idbPromise } from '../../utils/idb';
import { ADD_MULTIPLE_TO_SHOPPING_LIST } from "../../utils/actions";

const ShoppingList = () => {
    const state = useSelector(state => state);
    const dispatch = useDispatch();

    useEffect(() => {
        const getShoppingList = async () => {
            const shoppingList = await idbPromise('shopping list', 'get');
            dispatch({
                type: ADD_MULTIPLE_TO_SHOPPING_LIST,
                items: [...shoppingList]
            });
        }

        if (!state.shoppingList.length) {
            getShoppingList();
        }
    }, [state.shoppingList.length, dispatch]);

    console.log(state.shoppingList);


    return (
        <div className="container">

    {/* ======= FOR TESTING ONLY ========================== */}
                <h2 className='text-green'>Shopping List</h2>
    {/* ==================================================== */}

                        
            {state.shoppingList.length ? (
                <div>
                    {state.shoppingList.map(item => (
                        <WishListItem key={item._id} item={item} />
                    ))}
                </div>
            ) : (
                <div>
                    <span role='img' aria-label='relief'>
                        😌
                    </span>
                    Feels good to have the shopping done...
                </div>
            )}

        </div>
    );
};

export default ShoppingList;
