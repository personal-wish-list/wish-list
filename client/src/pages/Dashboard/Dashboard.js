import React, { useEffect, useState } from "react";
import './dashboard.css';
import { Link, useParams } from 'react-router-dom';

import { useQuery } from '@apollo/react-hooks'
import { QUERY_USER } from '../../utils/queries';

import AddWishListForm from '../../components/AddWishListForm/AddWishListForm';

const Dashboard = () => {
    const { loading, data } = useQuery(QUERY_USER);
    const [queryState, setQueryState] = useState({});
    const [wishlists, setWishlists] = useState([]);
    const { _id } = useParams();

    useEffect(() => {
        if (data) {
            setQueryState(data);
            setWishlists(data.user.lists);

            console.log(queryState);
            const newList = document.createElement("div");
            newList.textContent = "hello";

        }
    }, [data, loading, queryState, wishlists]);


    if (loading) return <div>Loading...</div>

    return (
        <div className="container">

            <h2>My Wish Lists</h2>

            {wishlists &&
                wishlists.map(wishlist => (
                    <div key={wishlist._id}>
                        <Link
                            // =================================================
                            // TRYING TO USE PARAMS TO NAVIGATE TO WISHLIST PAGE
                            // =================================================
                            to={`/wishlist/${wishlist._id}`}
                        // =================================================
                        >
                            {wishlist.name}
                        </Link>
                    </div>
                ))
            }

            <AddWishListForm />

        </div>
    );
};

export default Dashboard;
