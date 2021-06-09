import React from "react";
import './shopping-list-item.css';

import { formatUrl } from '../../utils/helpers';

const ShoppingListItem = ({ item }) => {
    // ========================================================================================
    // GraphQL mutations to:
    //     * mark as purchased (this would require new additions to the model)
    //     * unclaim item
    // ========================================================================================

    const {
        name,
        price,
        link,
        specialNote
    } = item;

    return (
        <div className='main'>
            <h1> Shopping List </h1>
            <ul className='cards'>
                <li className='card_item'>
                    <div className='card-1'>
                        <div className='card_content'>
                            <h3>
                                {name}
                                <span> ${price}</span>
                            </h3>
                            <a href={link}>{formatUrl(link)}</a>
                            <p>{specialNote}</p>
                        </div>
                    </div>
                </li>
            </ul>
        </div>
    );
};

export default ShoppingListItem;
