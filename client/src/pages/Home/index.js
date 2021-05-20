import React from "react";
import './css/style.css';

import WishList from '../WishList';
import SecretList from '../SecretList';
import ShoppingList from "../ShoppingList";

const Home = () => {
    return (
        <div className="container">
            <div>
                Home says <span className="text-green">"hi!"</span>
            </div>


            {/* =============== FOR TESTING PURPOSES ================= */}
            {/* <WishList /> */}
            <SecretList />
            <ShoppingList />
            {/* ====================================================== */}


        </div>
    );
};

export default Home;
