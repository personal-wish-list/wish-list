import React from "react";
import './dashboard.css';
import { Link } from 'react-router-dom';

import { useSelector } from 'react-redux';

import AddWishListForm from '../../components/AddWishListForm/AddWishListForm';
import WishList from '../WishList/WishList';

const Dashboard = () => {
    const wishlists = useSelector(state => state.wishlists);

    if (!wishlists) return <div><AddWishListForm /></div>;

    return (
        <div className="container">

            {wishlists && 
                wishlists.map(wishlist => (
                    <div>
                        <Link
                            to={`/wishlist/${wishlist._id}`}
                        >
                            {wishlist.name}
                        </Link>
                    </div>
                ))
            }

        </div>
    );
};

export default Dashboard;
