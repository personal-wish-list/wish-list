import React from "react";
import './shopping-list-item.css';

import { formatUrl } from '../../utils/helpers';

const ShoppingListItem = ({ item }) => {
    const {
        name,
        price,
        link,
        specialNote
    } = item;

    return (
    <div className = 'main'>
        <h1> Shopping List </h1>
    <ul className = 'cards'>
        <li className = 'card_item'>
            <div className = 'card-1'>
                <div className = 'card_content'>
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
    // <h1> Shopping List </h1>
    // <ul className = 'cards'>
    //     <li className = 'card_item'>
    //         <div className = 'card-1'>
    //             <div className = 'card_content'>
    //             <h3>
    //                 {name}
    //                 <span> ${price}</span>
    //             </h3>
    //             <a href={link}>{formatUrl(link)}</a>
    //             <p>{specialNote}</p>
    //             </div>
    //         </div>
    //     </li>
    // </ul>
        // <div className="container">
        //     <div className="wishlist-item">
        //         <h3>
        //             {name}
        //             <span> ${price}</span>
        //         </h3>
        //         <a href={link}>{formatUrl(link)}</a>
        //         <p>{specialNote}</p>
        //     </div>
        // </div>
    );
};

export default ShoppingListItem;

                // <li className = 'cards_item'>
                //     <div className = 'card-1'>
                //     {/* <div className = 'card_image'><img 
                //     src="https://picsum.photos/500/300/?image=2"/></div> */}
                //     <div className = 'card_content'>

                //         <h1>{name}</h1>

                //         <h4>${price}</h4>

                //         <a href={link} target='_blank' rel='noreferrer' className='item-link'>{formatUrl(link)}</a>

                //         <p>{specialNote}</p>

                //         <button className = 'btn card_btn' onClick={handleEdit}>Edit</button>
                //         <button className = 'btn card_btn' onClick={() => handleDelete(_id)}>Delete</button>

                //     </div>
                //     </div> 
                // </li>