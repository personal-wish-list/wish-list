import React, { useState } from "react";
import ContentEditable from 'react-contenteditable';
import './wishlist-item.css';

import { useSelector, useDispatch } from 'react-redux';
import { idbPromise } from '../../utils/idb';
import {
    UPDATE_WISHLIST_ITEM,
    UPDATE_SECRET_LIST_ITEM,
    UPDATE_SHOPPING_LIST_ITEM,
    REMOVE_FROM_WISHLIST,
    REMOVE_FROM_SECRET_LIST,
    REMOVE_FROM_SHOPPING_LIST
} from '../../utils/actions';
import { formatUrl } from '../../utils/helpers';

const WishListItem = ({ item }) => {
    let {
        _id,
        name,
        price,
        link,
        specialNote
    } = item;
    const [isEditing, setIsEditing] = useState(false);
    const { wishlist, secretList, shoppingList } = useSelector(state => state);
    const dispatch = useDispatch();

    const handleChange = (e) => {
        const {
            currentTarget: {
                dataset: { column },
            },
            target: { value }
        } = e;

        item = {
            ...item,
            [column]: value
        };
    };

    const handleEdit = () => {
        console.log(`editing ${name}...`)
        setIsEditing(true);
    }

    const handleSave = (id) => {
        const itemInWishlist = wishlist.find(item => item._id === id);
        const itemInSecretList = secretList.find(item => item._id === id);
        const itemInShoppingList = shoppingList.find(item => item._id === id);

        // update item in wishlist
        if (itemInWishlist) {
            dispatch({
                type: UPDATE_WISHLIST_ITEM,
                item: { ...item }
            });
            idbPromise('wishlist', 'put', {
                ...item
            });
        }

        // update item in secret list
        if (itemInSecretList) {
            dispatch({
                type: UPDATE_SECRET_LIST_ITEM,
                item: { ...item }
            });
            idbPromise('secret list', 'put', {
                ...item
            });
        }

        // update item in shopping list
        if (itemInShoppingList) {
            dispatch({
                type: UPDATE_SHOPPING_LIST_ITEM,
                item: { ...item }
            });
            idbPromise('shopping list', 'put', {
                ...item
            });
        }

        setIsEditing(false);
    }

    const handleDelete = (id) => {
        const itemInWishlist = wishlist.find(item => item._id === id);
        const itemInShoppingList = shoppingList.find(item => item._id === id);

        // remove from wishlist and secret list
        if (itemInWishlist) {
            dispatch({
                type: REMOVE_FROM_WISHLIST,
                item: { ...itemInWishlist }
            });
            idbPromise('wishlist', 'delete', {
                ...itemInWishlist
            });

            dispatch({
                type: REMOVE_FROM_SECRET_LIST,
                item: { ...itemInWishlist }
            });
            idbPromise('secret list', 'delete', {
                ...itemInWishlist
            });
        }

        // remove from shopping list
        if (itemInShoppingList) {
            dispatch({
                type: REMOVE_FROM_SHOPPING_LIST,
                item: { ...itemInShoppingList }
            });
            idbPromise('shopping list', 'delete', {
                ...itemInShoppingList
            });
        }

        console.log(`${name} deleted!`)
    };

    if (isEditing) {
        return (
            <div className="container">
                <div className="wishlist-item">

                    <strong>
                        <ContentEditable
                            html={name}
                            data-column='name'
                            className='content-editable'
                            onChange={handleChange}
                        />
                    </strong>

                    <strong>
                        <span>$
                        <ContentEditable
                                html={`${price}`}
                                data-column='price'
                                className='content-editable'
                                onChange={handleChange}
                            />
                        </span>
                    </strong>

                    <ContentEditable
                        html={link}
                        data-column='link'
                        className='content-editable'
                        onChange={handleChange}
                    />

                    <ContentEditable
                        html={specialNote}
                        data-column='specialNote'
                        className='content-editable'
                        onChange={handleChange}
                    />

                    <div>
                        <button onClick={() => handleSave(_id)}>Save</button>
                        <button onClick={() => handleDelete(_id)}>Delete</button>
                    </div>
                </div>
            </div>
        );
    }


    return (
                <li className = 'cards_item'>
                    <div className = 'card-1'>
                    {/* <div className = 'card_image'><img 
                    src="https://picsum.photos/500/300/?image=2"/></div> */}
                    <div className = 'card_content'>

                        <h1>{name}</h1>

                        <h4>${price}</h4>

                        <a href={link} target='_blank' rel='noreferrer' className='item-link'>{formatUrl(link)}</a>

                        <p>{specialNote}</p>

                        <button className = 'btn card_btn' onClick={handleEdit}>Edit</button>
                        <button className = 'btn card_btn' onClick={() => handleDelete(_id)}>Delete</button>

                    </div>
                    </div> 
                </li>
    );
};

export default WishListItem;