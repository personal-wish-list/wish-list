import React, { useEffect } from "react";
import './css/style.css';

import AddItemForm from '../../components/AddItemForm';
import WishListItem from '../../components/WishListItem';

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
            });
        }

        if (!state.wishlist.length) {
            getWishlist();
        }
    }, [state.wishlist.length, dispatch]);

    

    return (
        <div className="container">
            
            <AddItemForm />

            {state.wishlist.length ? (
                <div>
                    {state.wishlist.map(item => (
                        <WishListItem key={item._id} item={item} />
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