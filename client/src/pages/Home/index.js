import React from "react";
import './css/style.css';

import WishList from '../../components/WishList';

const Home = () => {
    return (
        <div className="container">
            <div>
                Home says <span className="text-green">"hi!"</span>
            </div>
            <WishList />
        </div>
    );
};

export default Home;
