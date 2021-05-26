import React, { useState } from "react";
import './friends-list.css';
import FriendCard from '../../components/FriendCard';

import { useQuery, useMutation } from "@apollo/client";
import { QUERY_USER } from '../../utils/queries';
import { ADD_FRIEND } from '../../utils/mutations';
import { useDispatch, useSelector } from 'react-redux';
import { ADD_USER_AS_FRIEND, REMOVE_USER_AS_FRIEND } from '../../utils/actions';

const FriendsList = () => {
    const state = useSelector(state => state);
    const dispatch = useDispatch();

    const [searchedUsername, setSearchedUsername] = useState('')
    const [users, setUsers] = useState([]);
    const { loading, data } = useQuery(QUERY_USER, {
        variables: { username: searchedUsername }
    });

    const handleChange = e => {
        console.log(e.target.value);
        setSearchedUsername(e.target.value)
    }

    const handleSearch = e => {
        e.preventDefault();

        if (data) {
            console.log(data);
        } else {
            console.log('no data');
        }
        

    }

    return (
        <div className="container">

            <form id='friend-search' onSubmit={handleSearch}>
                <label htmlFor='username'>Username:</label>
                <input
                    className='searchbar'
                    type='text'
                    name='username'
                    placeholder='Find friends here...'
                    value={searchedUsername}
                    onChange={handleChange}
                />
                <button type='submit'>
                    <i class="fas fa-search"></i>
                </button>
            </form>

            {state.friends.length ? (
                <div>
                    {state.friends.map(friend => {
                        <button className='' key={friend._id}>
                            <FriendCard friend={friend} />
                        </button>
                    })}
                </div>
            ) : (
                <div>

                </div>
            )}

        </div>
    );
};

export default FriendsList;
