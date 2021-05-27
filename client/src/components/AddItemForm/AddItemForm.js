import React, { useState } from "react";
import './add-item-form.css';

import { useMutation } from '@apollo/react-hooks';
import { UPDATE_WISHLIST } from '../../utils/mutations';

import { useDispatch } from 'react-redux'
import { idbPromise } from "../../utils/idb";
import { ADD_TO_SECRET_LIST, ADD_TO_WISHLIST } from "../../utils/actions";

const AddItemForm = () => {
    const [addItems] = useMutation(UPDATE_WISHLIST)
    const dispatch = useDispatch();

    const [formState, setFormState]
        = useState({
            _id: '',
            name: '',
            link: '',
            price: '',
            specialNote: '',
            isClaimed: false,
            isClaimedBy: ''
        });
    let {
        _id,
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

        try {
            await addItems({
                variables: {
                    name: formState.name,
                    link: formState.link,
                    price: formState.price,
                    specialNote: formState.specialNote,
                    isClaimed: false
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
    }

    // return (
    //     <section>
    //         <h2>Add an Item</h2>
    //         <form
    //             id='add-item-form'
    //             onSubmit={handleSubmit}
    //         >


    //             {/* ================= FOR TESTING ONLY ================ */}
    //             <div className="form-input">
    //                 <label htmlFor="_id">ID:</label>
    //                 <input
    //                     type="text"
    //                     name="_id"
    //                     defaultValue={_id}
    //                     onBlur={handleChange}
    //                 />
    //             </div>
    //             {/* =================================================== */}

    //             <div className="form-input">
    //                 <label htmlFor="name">Name:</label>
    //                 <input
    //                     type="text"
    //                     name="name"
    //                     defaultValue={name}
    //                     onBlur={handleChange}
    //                 />
    //             </div>
    //             <div className="form-input">
    //                 <label htmlFor="link">Link:</label>
    //                 <input
    //                     type="text"
    //                     name="link"
    //                     defaultValue={link}
    //                     onBlur={handleChange}
    //                 />
    //             </div>
    //             <div className="form-input">
    //                 <label htmlFor="price">Price: $</label>
    //                 <input
    //                     type="number"
    //                     name="price"
    //                     defaultValue={`$${price}`}
    //                     onBlur={handleChange}
    //                 />
    //             </div>
    //             <div className="form-input">
    //                 <label htmlFor="specialNote">Special Notes:</label>
    //                 <textarea
    //                     name="specialNote"
    //                     rows="5"
    //                     defaultValue={specialNote}
    //                     onBlur={handleChange}
    //                 />
    //             </div>

    //             <button type="submit" data-testid="submit">
    //                 Submit
    //             </button>
    //         </form>
    //     </section>
    // );

    return (
        <section>
            <h2 className='title '>Add an Item</h2>
            <form
                id='add-item-form'
                onSubmit={handleSubmit}
            >

                <div className='contact-form'>



                    {/* ================= FOR TESTING ONLY ================ */}
                    <div className="input-fields">
                        <label htmlFor="_id">ID:</label>
                        <input
                            type="text"
                            name="_id"
                            defaultValue={_id}
                            onBlur={handleChange}
                            className='input'
                        />
                    </div>
                    {/* =================================================== */}

                    <div className="input-fields">
                        <label htmlFor="name">Name:</label>
                        <input
                            type="text"
                            name="name"
                            defaultValue={name}
                            onBlur={handleChange}
                            className='input'
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
                        />
                    </div>
                    <div className="input-fields">
                        <label htmlFor="price">Price: $</label>
                        <input
                            type="number"
                            name="price"
                            defaultValue={`$${price}`}
                            onBlur={handleChange}
                            className='input'
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