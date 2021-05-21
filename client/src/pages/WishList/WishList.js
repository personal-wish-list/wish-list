import React, { useEffect } from "react";
import { Table } from 'semantic-ui-react';
import './wishlist.css';

import AddItemForm from '../../components/AddItemForm/AddItemForm';
import WishListItem from '../../components/WishListItem/WishListItem';

import { useSelector, useDispatch } from 'react-redux';
import { idbPromise } from '../../utils/idb';
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

    {/* ======= FOR TESTING ONLY ========================== */}
                <h2 className='text-green'>Wishlist</h2>
    {/* ==================================================== */}

            
            <AddItemForm />

            <Table celled>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell>Item</Table.HeaderCell>
                        <Table.HeaderCell>Price</Table.HeaderCell>
                        <Table.HeaderCell>Link</Table.HeaderCell>
                        <Table.HeaderCell>Note</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>
            </Table>

            <Table.Body>

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

            </Table.Body>

        </div>
    );
};

export default WishList;