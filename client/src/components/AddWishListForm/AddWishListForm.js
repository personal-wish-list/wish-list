import React, { useState } from "react";
import './add-wishlist-form.css';

import { useDispatch } from 'react-redux'
import { idbPromise } from "../../utils/idb";
import { ADD_A_WISHLIST } from "../../utils/actions";
import { ADD_WISHLIST } from '../../utils/mutations';
import { useMutation } from "@apollo/react-hooks";

const AddWishListForm = () => {
    const dispatch = useDispatch();
    const [addWishlist, { error }] = useMutation(ADD_WISHLIST);

    const [formState, setFormState]
        = useState({
            _id: '',
            name: '',
            month: '',
            day: '',
            year: '',
            items: []
        });
    let {
        _id,
        name,
        month,
        day,
        year,
        items
    } = formState;

    const date = new Date();
    const thisYear = date.getFullYear();

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(formState);

        try {
            await addWishlist({
                variables: { 
                    name: formState.name,
                    month: formState.month,
                    day: formState.day,
                    year: formState.year
                }
            });
        } catch (err) {
            console.error(err);
        }

        dispatch({
            type: ADD_A_WISHLIST,
            item: { ...formState }
        });
        idbPromise('wishlists', 'put', {
            ...formState,
            items: items
        });
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


                {/* ================= FOR TESTING ONLY ================ */}
                <div className="form-input">
                    <label htmlFor="_id">ID:</label>
                    <input
                        type="text"
                        name="_id"
                        defaultValue={_id}
                        onBlur={handleChange}
                    />
                </div>
                {/* =================================================== */}

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