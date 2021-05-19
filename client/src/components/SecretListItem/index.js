import React from "react";
import './css/style.css';

import { formatUrl } from '../../utils/helpers';

const SecretListItem = ({ item }) => {
    const {
        name,
        price,
        link,
        specialNote,
        claimed,
        claimedBy
    } = item;

    const handleClaimGift = () => {
        console.log(item.name);
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
                            onClick={handleClaimGift()}
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