import React, { useEffect } from "react";
import './shopping-list.css';

import ShoppingListItem from "../../components/ShoppingListItem/ShoppingListItem";

import { useSelector, useDispatch } from 'react-redux';
import { idbPromise } from '../../utils/idb';
import { ADD_MULTIPLE_TO_SHOPPING_LIST } from "../../utils/actions";

const ShoppingList = () => {
    const state = useSelector(state => state);
    const dispatch = useDispatch();

    useEffect(() => {
        // CHANGE TO GET USER'S SHOPPING LIST FROM DATABASE
        // WHEN THIS FEATURE IS ADDED TO BACK END
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

    

    return (
        <div className="container">
                        
            {state.shoppingList.length ? (
                <div>
                    {state.shoppingList.map(item => (
                        <ShoppingListItem key={item._id} item={item} />
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
