import React from "react";
import './friends-list.css';
import FriendCard from '../../components/FriendCard';

import { useDispatch, useSelector } from 'react-redux';
import {
    ADD_FRIEND,
    REMOVE_FRIEND
} from '../../utils/actions';

const FriendsList = () => {
    const state = useSelector(state => state);
    const dispatch = useDispatch();

    const handleSearch = () => {
        console.log('friend search says, "hi!"');
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
