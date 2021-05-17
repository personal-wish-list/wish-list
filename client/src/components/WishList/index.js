import React from "react";
import './css/style.css';

import ListItem from '../ListItem';

const WishList = () => {


    return (
        <div className="container">
            <div>
                WishList says <span className="text-purple">"Hello World!"</span>
            </div>
            <ListItem />
        </div>
    );
};

export default WishList;