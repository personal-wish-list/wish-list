import React from "react";
import './css/style.css';

import Wishlist from '../Wishlist';
import SecretList from '../SecretList';
import ShoppingList from "../ShoppingList";

const Home = () => {
    return (
        <div className="container">
            <div>
                Home says <span className="text-green">"hi!"</span>
            </div>


            {/* =============== FOR TESTING PURPOSES ================= */}
            <Wishlist />
            <SecretList />
            {/* <ShoppingList /> */}
            {/* ====================================================== */}


        </div>
    );
};

export default Home;
