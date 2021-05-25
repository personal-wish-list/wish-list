import React from "react";

import WishList from '../WishList/WishList';
import SecretList from '../SecretList/SecretList';
import ShoppingList from "../ShoppingList/ShoppingList";
import AddWishListForm from "../../components/AddWishListForm/AddWishListForm";

const Home = () => {
    return (
        <div className="container">


            {/* =============== FOR TESTING PURPOSES ================= */}
            <AddWishListForm />
            <WishList />
            <SecretList />
            <ShoppingList />
            {/* ====================================================== */}


        </div>
    );
};

export default Home;
