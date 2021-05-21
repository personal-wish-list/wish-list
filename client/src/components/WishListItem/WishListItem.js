import React from "react";
import './wishlist-item.css';

import { formatUrl } from '../../utils/helpers';

const WishListItem = ({ item }) => {
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

export default WishListItem;