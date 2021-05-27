import React from "react";

import SecretList from '../SecretList/SecretList';
import ShoppingList from "../ShoppingList/ShoppingList";
import AddWishListForm from "../../components/AddWishListForm/AddWishListForm";
import FriendsList from "../FriendsList/FriendsList";
// import Dashboard from "../Dashboard/Dashboard";
import WishList from "../WishList/WishList";
import './Home.css';

const Home = () => {
    return (

        <div>
            <div className ="video">
                <video className = "video-container" controls muted autoPlay loop>
                    <source src="../images/Gift.mp4" type="video/mp4"/>
                </video>
            </div>

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
