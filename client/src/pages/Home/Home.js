import React from "react";

import WishList from '../WishList/WishList';
import SecretList from '../SecretList/SecretList';
import ShoppingList from "../ShoppingList/ShoppingList";
import AddWishListForm from "../../components/AddWishListForm/AddWishListForm";
import FriendsList from "../FriendsList/FriendsList";

const Home = () => {
    return (
        <div className="container">


            {/* =============== FOR TESTING PURPOSES ================= */}
            <AddWishListForm />
            ======================================================================
            <WishList />
            ======================================================================
            <FriendsList />
            ======================================================================
            <SecretList />
            ======================================================================
            <ShoppingList />
            {/* ====================================================== */}


        </div>
    );
};

export default Home;
