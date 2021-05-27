import React from "react";

import SecretList from '../SecretList/SecretList';
import ShoppingList from "../ShoppingList/ShoppingList";
import AddWishListForm from "../../components/AddWishListForm/AddWishListForm";
import FriendsList from "../FriendsList/FriendsList";
import Dashboard from "../Dashboard/Dashboard";
import WishList from "../WishList/WishList";

const Home = () => {
    return (
        <div className="container">


            {/* =============== FOR TESTING PURPOSES ================= */}
            <h2>Wishlist</h2>
            <AddWishListForm />
            <WishList />
            ======================================================================
            <h2>Friends List</h2>
            <FriendsList />
            ======================================================================
            <h2>Secret List</h2>
            <SecretList />
            ======================================================================
            <h2>Shopping List</h2>
            <ShoppingList />
            {/* ====================================================== */}


        </div>
    );
};

export default Home;
