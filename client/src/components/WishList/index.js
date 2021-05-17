import React, { useEffect } from "react";
import './css/style.css';

import AddItemForm from '../AddItemForm';
import ListItem from '../ListItem';

import { useSelector, useDispatch } from 'react-redux';
import { idbPromise } from '../../utils/helpers';

const WishList = () => {
    const state = useSelector(state => state);
    const dispatch = useDispatch();

    useEffect(() => {
        const getItems = async () => {
            const items = await idbPromise('wishlist', 'get');
        }

        if (!state.wishlist.length) {
            getItems();
        }
    }, [state.wishlist.length, dispatch]);

    // const items = idbPromise('wishlist', 'get');
    // console.log(items);


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
            {/* <ListItem /> */}
        </div>
    );
};

export default WishList;