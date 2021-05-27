import React, { useState, useEffect } from "react";
import './secret-list.css';

import { useSelector, useDispatch } from 'react-redux';
import { idbPromise } from '../../utils/idb';
import {
    ADD_MULTIPLE_TO_SECRET_LIST,
    SORT_SECRET_LIST_ALPHABETICALLY,
    SORT_SECRET_LIST_PRICE_ASC,
    SORT_SECRET_LIST_PRICE_DESC
} from "../../utils/actions";

import SecretListItem from '../../components/SecretListItem/SecretListItem';

const SecretList = () => {
    // getting the secret list
    const state = useSelector(state => state);

    const dispatch = useDispatch();

    // if filtering, we'll render a filtered list
    const [filteredList, setFilteredList] = useState(state.secretList);
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

        if (!state.secretList.length) {
            getSecretList();
        }
    }, [state.secretList.length, dispatch]);

    const handleFilterChange = e => {
        setFilteredList(state.secretList);
        setIsFiltering(true);

        let {
            currentTarget: {
                dataset: { column },
            },
            target: { value }
        } = e;

        if (column === 'minPrice') setMinPrice(parseInt(value));
        if (column === 'maxPrice') setMaxPrice(parseInt(value));

        const priceFilteredList = state.secretList.filter(item => {
            return item.price >= minPrice && item.price <= maxPrice;
        });

        setFilteredList(priceFilteredList);
    };

    // reset filters
    const stopFiltering = () => {
        setIsFiltering(false);
        setMinPrice(0);
        setMaxPrice(500);
        setFilteredList(state.secretList);
    };

    const sortAlphabetically = () => {
        filteredList.sort((a, b) => {
            if (a.name < b.name) return -1;
            if (a.name > b.name) return 1;
            return 0;
        });
        
        dispatch({
            type: SORT_SECRET_LIST_ALPHABETICALLY,
            wishlist: [filteredList]
        });    
    };

    const sortPriceAscending = () => {
        filteredList.sort((a, b) => parseFloat(a.price) - parseFloat(b.price));

        dispatch({
            type: SORT_SECRET_LIST_PRICE_ASC,
            wishlist: [filteredList]
        });    
    };

    const sortPriceDescending = () => {
        filteredList.sort((a, b) => parseFloat(b.price) - parseFloat(a.price));

        dispatch({
            type: SORT_SECRET_LIST_PRICE_DESC,
            wishlist: [filteredList]
        });    
    };


    // const chooseRandomGift = () => {
    //     setIsFiltering(true)

    //     console logs before and after the filter function return the same filteredList
        
    //     setFilteredList(secretList);
    //     console.log(filteredList);
    //     setFilteredList(secretList.filter(item => item.price >= minPrice && item.price <= maxPrice));
    //     console.log(filteredList);

    //     random function
        
    //     const randomGift = filteredList[Math.floor(Math.random() * filteredList.length)];
    //     console.log(randomGift);

    //     array with only randomGift inside

    //     setFilteredList([randomGift]);
    // };

    return (
        <div className="container">

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
            {/* <button onClick={chooseRandomGift}>Select Random Gift!</button> */}

            <button onClick={sortAlphabetically}>Sort Alphabetically</button>
            <button onClick={sortPriceAscending}>Sort Price Asc</button>
            <button onClick={sortPriceDescending}>Sort Price Desc</button>


            {isFiltering ? (
                // if isFiltering render this
                <div>
                    {filteredList.map(item => (
                        <SecretListItem key={item._id} item={item} />
                    ))}
                </div>
            ) : (
                // else render this
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
