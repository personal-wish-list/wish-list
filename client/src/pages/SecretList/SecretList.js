import React, { useState, useEffect } from "react";
import './secret-list.css';

import { useSelector, useDispatch } from 'react-redux';
import { idbPromise } from '../../utils/idb';
import {
    ADD_MULTIPLE_TO_SECRET_LIST
} from "../../utils/actions";

import SecretListItem from '../../components/SecretListItem/SecretListItem';

const SecretList = () => {
    const state = useSelector(state => state);
    const dispatch = useDispatch();
    const [isFiltering, setIsFiltering] = useState(false);
    const [priceMin, setPriceMin] = useState(0);
    const [priceMax, setPriceMax] = useState(100);

    const getSecretList = async () => {
        const secretList = await idbPromise('secret list', 'get');
        dispatch({
            type: ADD_MULTIPLE_TO_SECRET_LIST,
            items: [...secretList]
        });
    }

    useEffect(() => {
        if (!state.secretList.length) {
            getSecretList();
        }
    }, [state.secretList.length, dispatch]);

    const handleChange = e => {
        let {
            currentTarget: {
                dataset: { column },
            },
            target: { value }
        } = e;

        console.log(`${column}: ${value}`);
        if (column === 'priceMin') setPriceMin(parseInt(value));
        if (column === 'priceMax') setPriceMax(parseInt(value));
    };

    const filterByPrice = (min, max) => {
        setIsFiltering(true);
        const priceFilteredList = state.secretList.filter(item => {
            return item.price >= min && item.price <= max;
        });

        console.log(priceFilteredList);

        state.secretList = priceFilteredList;
    };

    const stopFiltering = async () => {
        setIsFiltering(false);

        getSecretList();
    };

    return (
        <div className="container">

            {/* ======= FOR TESTING ONLY ========================== */}
            <h2 className='text-green'>Secret List</h2>
            {/* ==================================================== */}

            <div>
                <label htmlFor='priceMin'>Min Price: $</label>
                <input
                    type='number'
                    min='0'
                    name='priceMin'
                    data-column='priceMin'
                    value={priceMin}
                    onChange={handleChange}
                />
            </div>
            <div>
                <label htmlFor='priceMax'>Max Price: $</label>
                <input
                    type='number'
                    name='priceMax'
                    data-column='priceMax'
                    value={priceMax}
                    onChange={handleChange}
                />
            </div>
            <button onClick={() => filterByPrice(priceMin, priceMax)}>Filter</button>
            <button onClick={stopFiltering}>Clear Filters</button>

            {isFiltering ? (
                <div>
                    {state.secretList.map(item => (
                        <SecretListItem key={item._id} item={item} />
                    ))}
                </div>
            ) : (
                <div>
                    {
                        state.secretList.length ? (
                            <div>
                                {state.secretList.map(item => (
                                    <SecretListItem key={item._id} item={item} />
                                ))}
                            </div>
                        ) : (
                            <div>
                                This user has everything they want!
                                <span role='img' aria-label='smiley'>
                                    😃
                        </span>
                            </div>
                        )
                    }
                </div>
            )}


        </div>
    );
};

export default SecretList;
