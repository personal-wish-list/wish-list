import React, { useEffect } from "react";
import './css/style.css';

import { useSelector, useDispatch } from 'react-redux';
import { idbPromise } from '../../utils/helpers';
import { ADD_MULTIPLE_TO_SECRET_LIST } from "../../utils/actions";

const SecretList = () => {
    const state = useSelector(state => state);
    const dispatch = useDispatch();

    useEffect(() => {
        const getSecretList = async () => {
            const secretList = await idbPromise('secret list', 'get');
            dispatch({
                type: ADD_MULTIPLE_TO_SECRET_LIST,
                items: [...secretList]
            });
        }

        if (!state.secretList.length) {
            getSecretList();
        }
    }, [state.secretList.length, dispatch]);


    
    return (
        <div className="container">
            <div>
                Secret List says <span className="text-green">"hi!"</span>
            </div>
        </div>
    );
};

export default SecretList;
