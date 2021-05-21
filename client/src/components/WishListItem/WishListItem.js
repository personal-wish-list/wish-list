import React, { useState } from "react";
import ContentEditable from 'react-contenteditable';
import './wishlist-item.css';

import { useSelector, useDispatch } from 'react-redux';
import { idbPromise } from '../../utils/idb';
import {
    UPDATE_WISHLIST_ITEM,
    UPDATE_SECRET_LIST_ITEM,
    UPDATE_SHOPPING_LIST_ITEM
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
                item: { ...itemInWishlist }
            });
            idbPromise('wishlist', 'put', {
                ...itemInWishlist
            });
        }

        // update item in secret list
        if (itemInSecretList) {
            dispatch({
                type: UPDATE_SECRET_LIST_ITEM,
                item: { ...itemInWishlist }
            });
            idbPromise('wishlist', 'put', {
                ...itemInWishlist
            });
        }

        // update item in shopping list
        if (itemInShoppingList) {
            dispatch({
                type: UPDATE_SHOPPING_LIST_ITEM,
                item: { ...itemInWishlist }
            });
            idbPromise('wishlist', 'put', {
                ...itemInWishlist
            });
        }

        // console.log(itemState);
        setIsEditing(false);
    }

    const handleDelete = () => {
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
                        <button onClick={handleDelete}>Delete</button>
                    </div>
                </div>
            </div>
        );
    }


    return (
        <div className="container">
            <div className="wishlist-item">

                <h3>{name}</h3>

                <h4>${price}</h4>

                <a href={link} target='_blank' rel='noreferrer' className='item-link'>{formatUrl(link)}</a>

                <p>{specialNote}</p>

                <div>
                    <button onClick={handleEdit}>Edit</button>
                    <button onClick={handleDelete}>Delete</button>
                </div>
            </div>
        </div>
    );
};

export default WishListItem;