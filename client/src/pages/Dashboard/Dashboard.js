import React, { useEffect, useState } from "react";
import './dashboard.css';
import { Link } from 'react-router-dom';

import { useQuery } from '@apollo/react-hooks'
import { QUERY_USER } from '../../utils/queries';
import { useSelector } from 'react-redux';

import AddWishListForm from '../../components/AddWishListForm/AddWishListForm';
// import WishList from '../WishList/WishList';

const Dashboard = () => {
    const { loading, data } = useQuery(QUERY_USER);
    const [queryState, setQueryState] = useState({});
    const [wishlists, setWishlists] = useState([]);

    useEffect(() => {
        if (data) {
            setQueryState(data);
            setWishlists(data.user.lists);
        }
    }, [data, loading]);

    if (loading) return <div>Loading...</div>

    return (
        <div className="container">

            <h2>My Wish Lists</h2>

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
