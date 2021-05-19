import React, { useEffect } from "react";
import './css/style.css';

import { useSelector, useDispatch } from 'react-redux';
import { idbPromise } from '../../utils/idb';
import { ADD_MULTIPLE_TO_SECRET_LIST } from "../../utils/actions";

import SecretListItem from '../../components/SecretListItem';

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

            {state.secretList.length ? (
                <div>
                    {state.secretList.map(item => (
                        <SecretListItem key={item._id} item={item} />
                    ))}
                </div>
            ) : (
                <div>
                    This user has everything they want!
                    <span role='img' aria-label='gift'>
                        😃
                    </span>
                </div>
            )}

        </div>
    );
};

export default SecretList;
