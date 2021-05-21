import React from "react";

import WishList from '../WishList/WishList';
import SecretList from '../SecretList/SecretList';
import ShoppingList from "../ShoppingList/ShoppingList";

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
