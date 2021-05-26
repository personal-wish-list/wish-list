import React from "react";

// import WishList from '../WishList/WishList';
import SecretList from '../SecretList/SecretList';
import ShoppingList from "../ShoppingList/ShoppingList";
import AddWishListForm from "../../components/AddWishListForm/AddWishListForm";
import FriendsList from "../FriendsList/FriendsList";
import Dashboard from "../Dashboard/Dashboard";

const Home = () => {
    return (
        <div className="container">


            {/* =============== FOR TESTING PURPOSES ================= */}
            <AddWishListForm />
            ======================================================================
            <Dashboard />
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
