import React, { useState, useEffect } from "react";
import './add-wishlist-form.css';
import { useParams } from 'react-router-dom';

import { useDispatch } from 'react-redux'
import { idbPromise } from "../../utils/idb";
import { ADD_A_WISHLIST } from "../../utils/actions";
import { ADD_WISHLIST } from '../../utils/mutations';
import { useMutation } from "@apollo/react-hooks";

const AddWishListForm = () => {
    const date = new Date();
    const thisYear = date.getFullYear();

    const dispatch = useDispatch();
    const [addWishlist, { error }] = useMutation(ADD_WISHLIST);

    const { _id } = useParams();

    const [formState, setFormState]
        = useState({
            _id: '',
            name: '',
            month: 1,
            day: 1,
            year: thisYear,
            items: []
        });
    let {
        name,
        month,
        day,
        year,
        items
    } = formState;


    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(formState);
        // ===================================
        // ATTEMPT TO ADD WISHLIST TO DATABASE
        // ===================================
        try {
            await addWishlist({
                variables: {
                    name: formState.name,
                    month: parseInt(formState.month),
                    day: parseInt(formState.day),
                    year: parseInt(formState.year),
                    items: formState.items
                }
            });
            await dispatch({
                type: ADD_A_WISHLIST,
                item: { ...formState }
            });
            await idbPromise('wishlists', 'put', {
                ...formState,
                items: items
            });
        } catch (err) {
            console.error(err);
        }
        // ===================================
        // dispatch({
        //     type: ADD_A_WISHLIST,
        //     item: { ...formState }
        // });
        // idbPromise('wishlists', 'put', {
        //     ...formState,
        //     items: items
        // });
    };

    const handleChange = e => {
        setFormState({
            ...formState,
            [e.target.name]: e.target.value
        });
    }

    return (
        <section className='wrapper'>
            <h2>Add a Wishlist</h2>
            <form
                id='add-wishlist-form'
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
                            placeholder='Birthday, wedding, etc...'
                            className='input'
                        />
                    </div>
                    <div className="input-fields">
                        <label htmlFor="month">Month:</label>
                        <input
                            type="Number"
                            name="month"
                            defaultValue={month}
                            onBlur={handleChange}
                            className='input'
                        />
                    </div>
                    <div className="input-fields">
                        <label htmlFor="day">Day:</label>
                        <input
                            type="number"
                            name="day"
                            defaultValue={day}
                            onBlur={handleChange}
                            className='input'
                        />
                    </div>
                    <div className="input-fields">
                        <label htmlFor="year">Year:</label>
                        <input
                            type="number"
                            name="year"
                            min={thisYear}
                            defaultValue={year}
                            onBlur={handleChange}
                            className='input'
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

export default AddWishListForm;