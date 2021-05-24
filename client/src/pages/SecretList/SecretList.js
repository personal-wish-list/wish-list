import React, { useState, useEffect } from "react";
import './secret-list.css';

import { useSelector, useDispatch } from 'react-redux';
import { idbPromise } from '../../utils/idb';
import {
    ADD_MULTIPLE_TO_SECRET_LIST
} from "../../utils/actions";

import SecretListItem from '../../components/SecretListItem/SecretListItem';

const SecretList = () => {
    // getting the secret list
    const secretList = useSelector(state => state.secretList);

    const dispatch = useDispatch();

    // if filtering, we'll render a filtered list
    const [filteredList, setFilteredList] = useState(secretList);
    const [isFiltering, setIsFiltering] = useState(false);
    // parameters for filtering
    const [minPrice, setMinPrice] = useState(0);
    const [maxPrice, setMaxPrice] = useState(500);

    useEffect(() => {
        const getSecretList = async () => {
            // this will get secret list if offline
            const idbSecretList = await idbPromise('secret list', 'get');
            dispatch({
                type: ADD_MULTIPLE_TO_SECRET_LIST,
                items: [...idbSecretList]
            });
        }

        if (!secretList.length) {
            getSecretList();
        }
    }, [secretList.length, dispatch]);

    const handleFilterChange = e => {
        setFilteredList(secretList);
        setIsFiltering(true);

        let {
            currentTarget: {
                dataset: { column },
            },
            target: { value }
        } = e;

        if (column === 'minPrice') setMinPrice(parseInt(value));
        if (column === 'maxPrice') setMaxPrice(parseInt(value));

        const priceFilteredList = secretList.filter(item => {
            return item.price >= minPrice && item.price <= maxPrice;
        });

        setFilteredList(priceFilteredList);
    };

    // reset filters
    const stopFiltering = () => {
        setIsFiltering(false);
        setMinPrice(0);
        setMaxPrice(100);
        setFilteredList(secretList);
    };

    const chooseRandomGift = async () => {
        setIsFiltering(true);

        // console logs before and after the filter function return the same filteredList
        setFilteredList(secretList);
        console.log(filteredList);
        setFilteredList(secretList.filter(item => (item.price >= minPrice && item.price <= maxPrice)));
        console.log(filteredList);

        // random function
        const randomGift = filteredList[Math.floor(Math.random() * filteredList.length)];
        console.log(randomGift);

        // array with only randomGift inside
        setFilteredList([randomGift]);
    };

    return (
        <div className="container">

            {/* ======= FOR TESTING ONLY ========================== */}
            <h2 className='text-green'>Secret List</h2>
            {/* ==================================================== */}

            <div>
                <label htmlFor='minPrice'>Min Price: $</label>
                <input
                    type='number'
                    min='0'
                    max={maxPrice}
                    name='minPrice'
                    data-column='minPrice'
                    value={minPrice}
                    onChange={handleFilterChange}
                    onFocus={handleFilterChange}
                    onBlur={handleFilterChange}
                />
            </div>
            <div>
                <label htmlFor='maxPrice'>Max Price: $</label>
                <input
                    type='number'
                    min={minPrice}
                    name='maxPrice'
                    data-column='maxPrice'
                    value={maxPrice}
                    onChange={handleFilterChange}
                    onFocus={handleFilterChange}
                    onBlur={handleFilterChange}
                />
            </div>
            <button onClick={stopFiltering}>Clear Filters</button>
            <button
                onClick={() => {
                    // this looks crazy because we may need to add another function...
                    chooseRandomGift();
                }}
            >
                Select Random Gift!
            </button>

            {isFiltering ? (
                // if isFiltering render this
                <div>
                    {
                        filteredList.length ? (
                            <div>
                                {filteredList.map(item => (
                                    <SecretListItem key={item._id} item={item} />
                                ))}
                            </div>
                        ) : (
                            <div>
                                No more gifts to buy!
                                <span role='img' aria-label='smiley'>
                                    😃
                                </span>
                            </div>
                        )
                    }
                </div>
            ) : (
                // else render this
                <div>
                    {
                        secretList.length ? (
                            <div>
                                {secretList.map(item => (
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
