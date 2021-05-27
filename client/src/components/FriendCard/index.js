import React from 'react';
import './style.css';

// Props are passed through our functional component.
function FriendCard({friend}) {
  console.log(friend);

  return (
    <div className="card">
      <div className="content">
        I'm a Friend
        <ul>
          <li>
            {/* <strong>Name:</strong> {props.name} */}
          </li>
          <li>
            {/* <strong>Username:</strong> {props.username} */}
          </li>
        </ul>
      </div>
      {/* The onClick method will invoke the removeFriends function passing through the value of props.id  */}
      {/* <span onClick={() => props.removeFriend(props.id)} className="remove">
        𝘅
      </span> */}
    </div>
  );
}

export default FriendCard;
