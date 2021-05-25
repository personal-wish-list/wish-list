import React from "react";
import './secret-list-item.css';

import { useSelector, useDispatch } from 'react-redux';
import { idbPromise } from '../../utils/idb';
import { ADD_TO_SHOPPING_LIST, UPDATE_SECRET_LIST_ITEM } from '../../utils/actions';
import { formatUrl } from '../../utils/helpers';

const SecretListItem = ({ item }) => {
    const state = useSelector(state => state);
    const { shoppingList } = state;
    const dispatch = useDispatch();
    let {
        _id,
        name,
        price,
        link,
        specialNote,
        isClaimed,
        isClaimedBy
    } = item;

    const handleClaimGift = () => {
        const itemInShoppingList = shoppingList.find(item => item._id === _id);

        if (itemInShoppingList) return;
        else {
            isClaimed = true;
    // --- CHANGE TO FRIEND'S USERNAME ---------
            isClaimedBy = 'Me';
    // ---------------------------------------

            dispatch({
                type: ADD_TO_SHOPPING_LIST,
                item: {
                    ...item,
                    isClaimed: isClaimed,
                    isClaimedBy: isClaimedBy
                }
            });

            idbPromise('shopping list', 'put', {
                ...item,
                isClaimed: isClaimed,
                isClaimedBy: isClaimedBy
            });

            dispatch({
                type: UPDATE_SECRET_LIST_ITEM,
                item: {
                    ...item,
                    isClaimed: isClaimed,
                    isClaimedBy: isClaimedBy
                }
            });

            idbPromise('secret list', 'put', {
                ...item,
                isClaimed: isClaimed,
                isClaimedBy: isClaimedBy
            });
        }
    };


    return (
        <div className="container">
            <div className="secret-list-item">
                <h3>
                    {name}
                    <span> ${price}</span>
                </h3>
                <a href={link}>{formatUrl(link)}</a>
                <p>{specialNote}</p>

                {/* ======= COME BACK TO THIS WHEN FRIEND FUNCTIONALITY IN PLACE ====== */}
                {isClaimed ? (
                    <div>
                        Claimed by: {isClaimedBy}
                    </div>
                ) : (
                    <div>
                        <button
                            id="claim-gift"
                            onClick={handleClaimGift}
                        >
                            Claim Gift
                        </button>
                    </div>
                )}
                {/* =================================================================== */}

            </div>
        </div>
    );
};

export default SecretListItem;