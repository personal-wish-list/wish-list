import React from "react";
import './css/style.css';

const ListItem = ({ item }) => {
    const {
        name,
        price,
        link,
        specialNote
    } = item;

    return (
        <div className="container">
            <div>
                <h3>
                    {name}
                    <span> ${price}</span>
                </h3>
                <a href={link}>{link}</a>
                <p>{specialNote}</p>
            </div>
        </div>
    );
};

export default ListItem;