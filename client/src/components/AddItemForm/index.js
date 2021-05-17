import React, { useState } from "react";
import './css/style.css';

const AddItemForm = () => {
    const [formState, setFormState] =
        useState({
            name: '',
            link: '',
            price: '',
            specialNote: ''
        });
    const {
        name,
        link,
        price,
        specialNote
    } = formState;

    const handleSubmit = e => {
        e.preventDefault();
        console.log(formState);
    };

    const handleChange = e => {
        setFormState({
            ...formState,
            [e.target.name]: e.target.value
        });
    }

    return (
        <section>
            <h2>Add an Item</h2>
            <form
                id='add-item-form'
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
                    <label htmlFor="link">Link:</label>
                    <input
                        type="text"
                        name="link"
                        defaultValue={link}
                        onBlur={handleChange}
                    />
                </div>
                <div className="form-input">
                    <label htmlFor="price">Price:</label>
                    <input
                        type="number"
                        name="price"
                        defaultValue={`$${price}`}
                        onBlur={handleChange}
                    />
                </div>
                <div className="form-input">
                    <label htmlFor="specialNote">Special Notes:</label>
                    <textarea
                        name="specialNote"
                        rows="5"
                        defaultValue={specialNote}
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

export default AddItemForm;