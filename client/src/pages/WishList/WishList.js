import React, { useEffect } from "react";
import './wishlist.css';

import AddItemForm from '../../components/AddItemForm/AddItemForm';
import WishListItem from '../../components/WishListItem/WishListItem';

import { useSelector, useDispatch } from 'react-redux';
import { idbPromise } from '../../utils/idb';
import {
    ADD_MULTIPLE_TO_WISHLIST,
    SORT_WISHLIST_PRICE_ASC,
    SORT_WISHLIST_PRICE_DESC
} from "../../utils/actions";


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

    const sortPriceAscending = () => {
        state.wishlist.sort((a, b) => parseFloat(a.price) - parseFloat(b.price));

        dispatch({
            type: SORT_WISHLIST_PRICE_ASC,
            wishlist: [state.wishlist]
        });
        console.log(state.wishlist);

    };

    const sortPriceDescending = () => {
        state.wishlist.sort((a, b) => parseFloat(b.price) - parseFloat(a.price));

        dispatch({
            type: SORT_WISHLIST_PRICE_DESC,
            wishlist: [state.wishlist]
        });
        console.log(state.wishlist);

    };

    return (
        <div className="container">

            {/* ======= FOR TESTING ONLY ========================== */}
            <h2 className='text-green'>Wishlist</h2>
            {/* ==================================================== */}


            <AddItemForm />


            {state.wishlist.length ? (
                <div>
                    <button onClick={sortPriceAscending}>Sort by price</button>
                    <button onClick={sortPriceDescending}>Sort reverse by price</button>

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