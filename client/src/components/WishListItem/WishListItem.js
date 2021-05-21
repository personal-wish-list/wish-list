import React, { useState } from "react";
import ContentEditable from 'react-contenteditable';
import './wishlist-item.css';

import { formatUrl } from '../../utils/helpers';

const WishListItem = ({ item }) => {
    const [isEditing, setIsEditing] = useState(false);
    let {
        name,
        price,
        link,
        specialNote
    } = item;

    const handleChange = (e) => {
        const {
            currentTarget: {
                dataset: { column },
            },
            target: { value }
        } = e;

        console.log(`${column}: ${value}`);
    };

    const handleEdit = () => {
        console.log(`editing ${name}...`)
        setIsEditing(true);
    }

    const handleSave = () => {
        console.log(`${name} saved!`);
        setIsEditing(false);
    }

    const handleDelete = () => {
        console.log(`${name} deleted!`)
    };

    if (isEditing) {
        return (
            <div className="container">
                <div className="wishlist-item">

                    <strong>
                        <ContentEditable
                            html={name}
                            data-column='name'
                            className='content-editable'
                            onChange={handleChange}
                        />
                    </strong>

                    <strong>
                        <span>$
                        <ContentEditable
                            html={`${price}`}
                            data-column='price'
                            className='content-editable'
                            onChange={handleChange}
                        />
                        </span>
                    </strong>

                    <ContentEditable
                        html={link}
                        data-column='link'
                        className='content-editable'
                        onChange={handleChange}
                    />

                    <ContentEditable
                        html={specialNote}
                        data-column='specialNote'
                        className='content-editable'
                        onChange={handleChange}
                    />

                    <div>
                        <button onClick={handleSave}>Save</button>
                        <button onClick={handleDelete}>Delete</button>
                    </div>
                </div>
            </div>
        );
    }


    return (
        <div className="container">
            <div className="wishlist-item">

                <h3>{name}</h3>

                <h4>${price}</h4>

                <a href={link} target='_blank' rel='noreferrer' className='item-link'>{formatUrl(link)}</a>

                <p>{specialNote}</p>

                <div>
                    <button onClick={handleEdit}>Edit</button>
                    <button onClick={handleDelete}>Delete</button>
                </div>
            </div>
        </div>
    );
};

export default WishListItem;