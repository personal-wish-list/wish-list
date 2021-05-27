import React, { useState } from "react";
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
    const { id } = useParams();

    const [formState, setFormState]
        = useState({
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
                    year: parseInt(formState.year)
                }
            });
        } catch (err) {
            console.error(err);
        }
        // ===================================

        dispatch({
            type: ADD_A_WISHLIST,
            item: { ...formState }
        });
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
        <section>
            <h2>Add a Wishlist</h2>
            <form
                id='add-wishlist-form'
                onSubmit={handleSubmit}
            >

                <div className="form-input">
                    <label htmlFor="name">Name:</label>
                    <input
                        type="text"
                        name="name"
                        defaultValue={name}
                        onBlur={handleChange}
                    />
                </div>
                <div className="form-input">
                    <label htmlFor="month">Month:</label>
                    <input
                        type="number"
                        name="month"
                        min='1'
                        max='12'
                        defaultValue={month}
                        onBlur={handleChange}
                    />
                </div>
                <div className="form-input">
                    <label htmlFor="day">Day:</label>
                    <input
                        type="number"
                        name="day"
                        min='1'
                        max='31'
                        defaultValue={day}
                        onBlur={handleChange}
                    />
                </div>
                <div className="form-input">
                    <label htmlFor="year">Year:</label>
                    <input
                        type="number"
                        name="year"
                        min={thisYear}
                        defaultValue={year}
                        onBlur={handleChange}
                    />
                </div>

                <button type="submit" data-testid="submit">
                    Submit
                </button>
            </form>
        </section>
    );
};

export default AddWishListForm;