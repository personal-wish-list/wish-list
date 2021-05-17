import React from "react";
import './css/style.css';

import AddItemForm from '../AddItemForm';
import ListItem from '../ListItem';

const WishList = () => {


    return (
        <div className="container">
            <div>
                WishList says <span className="text-purple">"Hello World!"</span>
            </div>
            <AddItemForm />
            <ListItem />
        </div>
    );
};

export default WishList;