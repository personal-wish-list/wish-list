import React, { useState } from "react";
import './friends-list.css';
import FriendCard from '../../components/FriendCard';

import { useQuery, useMutation } from "@apollo/client";
import { QUERY_USERNAME } from '../../utils/queries';
import { ADD_FRIEND } from '../../utils/mutations';
import { useDispatch, useSelector } from 'react-redux';
import { ADD_USER_AS_FRIEND, REMOVE_USER_AS_FRIEND } from '../../utils/actions';

const FriendsList = () => {
    const state = useSelector(state => state);
    const dispatch = useDispatch();

    let userObj = {
        _id: '',
        username: '',
        firstName: '',
        lastName: '',
        email: ''
    };
    const [searchedUsername, setSearchedUsername] = useState('');
    const [foundUser, setFoundUser] = useState(userObj);
    const { loading, data } = useQuery(QUERY_USERNAME, {
        variables: { username: searchedUsername }
    });
    const [addFriend] = useMutation(ADD_FRIEND);

    const handleChange = e => {
        console.log(e.target.value);
        setSearchedUsername(e.target.value)
    };

    const handleSearch = e => {
        e.preventDefault();

        if (data) {
            setFoundUser(data.username);
        } else {
            console.log('no data');
        }
    };

    const addFriendHandler = async () => {
        console.log(foundUser.username);
        try {
            await addFriend({
                variables: { friendId: foundUser._id }
            });
        } catch (err) {
            console.error(err);
        }

        dispatch({
            type: ADD_USER_AS_FRIEND,
            friend: foundUser
        });
    };

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

            {foundUser.username.length ? (
                <div>
                    <p>{foundUser.username}</p>
                    <p>{foundUser.firstName}</p>
                    <p>{foundUser.lastName}</p>
                    <p>{foundUser.email}</p>
                    <button onClick={addFriendHandler} type='button'>Add Friend</button>
                </div>
            ) : (
                <div />
            )}


            {state.friends.length ? (
                <div>
                    {state.friends.map(friend => {
                        <button className='' key={friend._id}>
                            <div>{friend.firstName}{' '}{friend.lastName}</div>
                            <FriendCard friend={friend} />
                        </button>
                    })}
                </div>
            ) : (
                <div></div>
            )}

        </div >
    );
};

export default FriendsList;
