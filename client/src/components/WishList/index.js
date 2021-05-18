import React, { useEffect } from "react";
import './css/style.css';

import AddItemForm from '../AddItemForm';
import ListItem from '../ListItem';

import { useSelector, useDispatch } from 'react-redux';
import { idbPromise } from '../../utils/helpers';
import { ADD_MULTIPLE_TO_WISHLIST } from "../../utils/actions";


const WishList = () => {
    const state = useSelector(state => state);
    const dispatch = useDispatch();

    useEffect(() => {
        const getWishlist = async () => {
            const wishlist = await idbPromise('wishlist', 'get');
            dispatch({
                type: ADD_MULTIPLE_TO_WISHLIST,
                items: [...wishlist]
            })
        }

        if (!state.wishlist.length) {
            getWishlist();
        }
    }, [state.wishlist.length, dispatch]);

    // const items = idbPromise('wishlist', 'get');
    // console.log(state.wishlist);


    return (
        <div className="container">
            <div>
                WishList says <span className="text-purple">"Hello World!"</span>
            </div>
            <AddItemForm />

            {state.wishlist.length ? (
                <div>
                    {state.wishlist.map(item => (
                        <ListItem key={item._id} item={item} />
                    ))}
                </div>
            ) : (
                <div>
                    <span role='img' aria-label='gift'>
                        🎁
                    </span>
                    Add items to your wishlist if you want gifts
                </div>
            )}

        </div>
    );
};

export default WishList;