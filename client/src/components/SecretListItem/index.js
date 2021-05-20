import React from "react";
import './css/style.css';

import { useSelector, useDispatch } from 'react-redux';
import { idbPromise } from '../../utils/idb';
import { ADD_TO_SHOPPING_LIST } from '../../utils/actions';
import { formatUrl } from '../../utils/helpers';

const SecretListItem = ({ item }) => {
    const state = useSelector(state => state);
    const { shoppingList } = state;
    const itemInShoppingList = shoppingList.find(item => item._id === item._id);

    const dispatch = useDispatch();
    let {
        name,
        price,
        link,
        specialNote,
        isClaimed,
        isClaimedBy
    } = itemInShoppingList;
    console.log(isClaimed);
    console.log(isClaimedBy);

    const handleClaimGift = () => {
        console.log(name);
        console.log(state);

        console.log(itemInShoppingList);

        if (itemInShoppingList) {
            return;
        } else {
            isClaimed = true;
            isClaimedBy = 'Me';
            

            dispatch({
                type: ADD_TO_SHOPPING_LIST,
                item: { ...item, isClaimed: isClaimed, isClaimedBy: isClaimedBy }
            });

            idbPromise('shopping list', 'put', {
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