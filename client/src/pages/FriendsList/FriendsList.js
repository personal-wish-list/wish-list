import React, { useEffect, useState } from "react";
import './friends-list.css';
import FriendCard from '../../components/FriendCard';

<<<<<<< HEAD
import { useQuery, useMutation } from '@apollo/react-hooks';
=======
import { useQuery, useMutation } from "@apollo/react-hooks";
>>>>>>> 6c1eba299fe528d890ef90230ce97b3a76105d77
import { QUERY_USER, QUERY_USERNAME } from '../../utils/queries';
import { ADD_FRIEND } from '../../utils/mutations';
import { useDispatch } from 'react-redux';
import { ADD_USER_AS_FRIEND } from '../../utils/actions';

const FriendsList = () => {
    const dispatch = useDispatch();

    const { loading, data } = useQuery(QUERY_USER);
    const [myFriends, setMyFriends] = useState([]);
    useEffect(() => {
        if (data) {
            setMyFriends(data.user.friends);
        }
    }, [loading, data]);




    let searchedUserObj = {
        _id: '',
        username: '',
        firstName: '',
        lastName: '',
        email: ''
    };
    const [searchedUsername, setSearchedUsername] = useState('');
    const [foundUser, setFoundUser] = useState(searchedUserObj);
    const usernameSearch = useQuery(QUERY_USERNAME, {
        variables: { username: searchedUsername }
    });
    const [addFriend] = useMutation(ADD_FRIEND);

    const handleChange = e => {
        console.log(e.target.value);
        setSearchedUsername(e.target.value)
    };

    const handleSearch = e => {
        e.preventDefault();

        if (usernameSearch.data) {
            setFoundUser(usernameSearch.data.username);
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
                </div >
            ) : (
                <div></div>
            )}

            {myFriends &&
                myFriends.map(friend => (
                    <div>
                        <FriendCard key={friend._id} friend={friend} />
                    </div>
                ))
            }

        </div >
    );
};

export default FriendsList;
