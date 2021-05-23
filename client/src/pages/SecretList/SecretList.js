import React, { useState, useEffect } from "react";
import './secret-list.css';

import { useSelector, useDispatch } from 'react-redux';
import { idbPromise } from '../../utils/idb';
import {
    ADD_MULTIPLE_TO_SECRET_LIST
} from "../../utils/actions";

import SecretListItem from '../../components/SecretListItem/SecretListItem';

const SecretList = () => {
    const secretList = useSelector(state => state.secretList);
    const dispatch = useDispatch();
    const [filteredList, setFilteredList] = useState(secretList);
    const [isFiltering, setIsFiltering] = useState(false);
    const [minPrice, setMinPrice] = useState(0);
    const [maxPrice, setMaxPrice] = useState(100);

    useEffect(() => {
        const getSecretList = async () => {
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

    const stopFiltering = async () => {
        setIsFiltering(false);
        setMinPrice(0);
        setMaxPrice(100);
        setFilteredList(secretList);
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

            {isFiltering ? (
                <div>
                    {filteredList.map(item => (
                        <SecretListItem key={item._id} item={item} />
                    ))}
                </div>
            ) : (
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
