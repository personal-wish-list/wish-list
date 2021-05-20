import React from "react";
import './css/style.css';

import WishList from '../WishList';
import SecretList from '../SecretList';
import ShoppingList from "../ShoppingList";

const Home = () => {
    return (
        <div className="container">


            {/* =============== FOR TESTING PURPOSES ================= */}
            <WishList />
            <SecretList />
            <ShoppingList />
            {/* ====================================================== */}


        </div>
    );
};

export default Home;
