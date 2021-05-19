import React from "react";
import './css/style.css';

import { useSelector, useDispatch } from 'react-redux';
import { idbPromise } from '../../utils/idb';
import { ADD_TO_SHOPPING_LIST } from '../../utils/actions';
import { formatUrl } from '../../utils/helpers';

const SecretListItem = ({ item }) => {
    const state = useSelector(state => state);
    const dispatch = useDispatch();
    const {
        name,
        price,
        link,
        specialNote,
        claimed,
        claimedBy
    } = item;

    const handleClaimGift = () => {
        console.log(name);
        console.log(state);
        dispatch({
            type: ADD_TO_SHOPPING_LIST,
            item: { ...item, claimed: true, claimedBy: 'Me' }
        });

        idbPromise('shopping list', 'put', {
            ...item,
            claimed: true,
            claimedBy: 'Me'
        })
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
                {claimed ? (
                    <div>
                        Claimed by: {claimedBy}
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