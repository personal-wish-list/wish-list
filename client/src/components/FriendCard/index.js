import React from 'react';
import { Link } from 'react-router-dom';
import './style.css';

// Props are passed through our functional component.
function FriendCard({ friend }) {
  console.log(friend);
  const {
    _id,
    firstName,
    lastName,
    username,
    lists
  } = friend;

  return (
    <div className="card">
      <div className="content">
        <ul>
          <li>
            <Link to={`/dashboard/${_id}`}>{username}</Link>
          </li>
          <li>
            {firstName} {' '} {lastName}
          </li>
        </ul>
      </div>
      <div>
        {lists &&
          lists.map(wishlist => (
            <div key={wishlist._id}>
              <Link to={`/wishlist/${wishlist._id}`}>{wishlist.name}</Link>
            </div>
          ))
        }
      </div>
    </div>
  );
}

export default FriendCard;
