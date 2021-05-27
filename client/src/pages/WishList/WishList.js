import React, { useEffect } from "react";
import './wishlist.css';

import AddItemForm from '../../components/AddItemForm/AddItemForm';
import WishListItem from '../../components/WishListItem/WishListItem';

import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { idbPromise } from '../../utils/idb';
import {
    ADD_MULTIPLE_TO_WISHLIST,
    SORT_WISHLIST_ALPHABETICALLY,
    SORT_WISHLIST_PRICE_ASC,
    SORT_WISHLIST_PRICE_DESC
} from "../../utils/actions";


const WishList = () => {
    const { _id } = useParams();
    // ================================================================
    // useParams WOULD GO HERE ALONG WITH wishlist query TO FIND BY _id
    // ================================================================

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
        
        <div className = 'body'>
            <h1> Wish List </h1>
            <div className = 'wrapper'>
                <AddItemForm />
            </div>



            {state.wishlist.length ? (
                <div className = 'main'>
                    <button className = 'btn card_btn' onClick={sortAlphabetically}>Sort Alphabetically</button>
                    <button className = 'btn card_btn' onClick={sortPriceAscending}>Sort Price Asc</button>
                    <button className = 'btn card_btn' onClick={sortPriceDescending}>Sort Price Desc</button>
                <ul className = 'cards'>
                    {state.wishlist.map(item => (
                        <WishListItem key={item._id} item={item} />
                    ))}
                </ul>
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