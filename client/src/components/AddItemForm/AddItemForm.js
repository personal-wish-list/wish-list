import React, { useState } from "react";
import './add-item-form.css';

import { useQuery, useMutation } from '@apollo/react-hooks';
import { UPDATE_WISHLIST } from '../../utils/mutations';
import { QUERY_USER } from '../../utils/queries';

import { useDispatch } from 'react-redux'
import { idbPromise } from "../../utils/idb";
import { ADD_TO_SECRET_LIST, ADD_TO_WISHLIST } from "../../utils/actions";

const AddItemForm = () => {
    const [addItems] = useMutation(UPDATE_WISHLIST)
    let wishListId = window.location.pathname;
    wishListId = wishListId.split('/');
    wishListId = wishListId[2];
    const dispatch = useDispatch();

    const [formState, setFormState]
        = useState({
            _id: '',
            name: '',
            link: '',
            price: 0.0,
            specialNote: '',
            isClaimed: false,
            isClaimedBy: ''
        });
    let {
        name,
        link,
        price,
        specialNote,
        isClaimed,
        isClaimedBy
    } = formState;

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(formState);
        console.log(wishListId);

        try {
            await addItems({
                variables: {
                    _id: wishListId,
                    input: {
                        name: formState.name,
                        link: formState.link,
                        price: parseInt(formState.price),
                        specialNote: formState.specialNote,
                        isClaimed: false
                    }
                }
            });
        } catch (err) {
            console.error(err);
        }

        dispatch({
            type: ADD_TO_WISHLIST,
            item: { ...formState }
        });
        idbPromise('wishlist', 'put', {
            ...formState,
            isClaimed: isClaimed,
            isClaimedBy: isClaimedBy
        });

        dispatch({
            type: ADD_TO_SECRET_LIST,
            item: { ...formState }
        });
        idbPromise('secret list', 'put', {
            ...formState,
            isClaimed: isClaimed,
            isClaimedBy: isClaimedBy
        });

        // window.location.reload();

        // setFormState({
        //     _id: '',
        //     name: '',
        //     link: '',
        //     price: '',
        //     specialNote: '',
        // });
    };

    const handleChange = e => {
        setFormState({
            ...formState,
            [e.target.name]: e.target.value
        });
    };

    return (
        <section>
            <h2 className='title '>Add an Item</h2>
            <form
                id='add-item-form'
                onSubmit={handleSubmit}
            >

                <div className='contact-form'>

                    <div className="input-fields">
                        <label htmlFor="name">Name:</label>
                        <input
                            type="text"
                            name="name"
                            defaultValue={name}
                            onBlur={handleChange}
                            className='input'
                            placeholder='What do you want?'
                        />
                    </div>
                    <div className="input-fields">
                        <label htmlFor="link">Link:</label>
                        <input
                            type="text"
                            name="link"
                            defaultValue={link}
                            onBlur={handleChange}
                            className='input'
                            placeholder='Copy and paste link here'
                        />
                    </div>
                    <div className="input-fields">
                        <label htmlFor="price">Price: $</label>
                        <input
                            type="Number"
                            name="price"
                            onBlur={handleChange}
                            className='input'
                            placeholder='$$$$'
                        />
                    </div>
                    <div className="msg">
                        <label htmlFor="specialNote">Special Notes:</label>
                        <textarea
                            name="specialNote"
                            rows="5"
                            defaultValue={specialNote}
                            onBlur={handleChange}
                            className='input'
                            placeholder='Size, color, etc...'
                        />
                    </div>

                    <button className='btn' type="submit" data-testid="submit">
                        Submit
                    </button>
                </div>
            </form>
        </section>
    );
};

export default AddItemForm;