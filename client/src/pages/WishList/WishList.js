import React, { useEffect } from "react";
import './wishlist.css';

import { useMutation } from '@apollo/react-hooks';
import { ADD_WISHLIST } from '../../utils/mutations';

import AddItemForm from '../../components/AddItemForm/AddItemForm';
import WishListItem from '../../components/WishListItem/WishListItem';


import { useSelector, useDispatch } from 'react-redux';
import { idbPromise } from '../../utils/idb';
import {
    ADD_MULTIPLE_TO_WISHLIST,
    SORT_WISHLIST_ALPHABETICALLY,
    SORT_WISHLIST_PRICE_ASC,
    SORT_WISHLIST_PRICE_DESC
} from "../../utils/actions";


const WishList = () => {
    const [addWishList] = useMutation(ADD_WISHLIST);
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
    }, [addWishList, state.wishlist.length, dispatch]);

    const sortAlphabetically = () => {
        state.wishlist.sort((a, b) => {
            if (a.name < b.name) return -1;
            if (a.name > b.name) return 1;
            return 0;
        });

        dispatch({
            type: SORT_WISHLIST_ALPHABETICALLY,
            wishlist: [state.wishlist]
        });
    };

    const sortPriceAscending = () => {
        state.wishlist.sort((a, b) => parseFloat(a.price) - parseFloat(b.price));

        dispatch({
            type: SORT_WISHLIST_PRICE_ASC,
            wishlist: [state.wishlist]
        });
    };

    const sortPriceDescending = () => {
        state.wishlist.sort((a, b) => parseFloat(b.price) - parseFloat(a.price));

        dispatch({
            type: SORT_WISHLIST_PRICE_DESC,
            wishlist: [state.wishlist]
        });
    };

    return (
        <div className="container">

            <AddItemForm />


            {state.wishlist.length ? (
                <div>
                    <button onClick={sortAlphabetically}>Sort Alphabetically</button>
                    <button onClick={sortPriceAscending}>Sort Price Asc</button>
                    <button onClick={sortPriceDescending}>Sort Price Desc</button>

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