import React from "react";
import './css/style.css';

import { formatUrl } from '../../utils/helpers';

const WishlistItem = ({ item }) => {
    const {
        name,
        price,
        link,
        specialNote
    } = item;

    return (
        <div className="container">
            <div className="wishlist-item">
                <h3>
                    {name}
                    <span> ${price}</span>
                </h3>
                <a href={link}>{formatUrl(link)}</a>
                <p>{specialNote}</p>
            </div>
        </div>
    );
};

export default WishlistItem;