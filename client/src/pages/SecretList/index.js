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

    {/* ======= FOR TESTING ONLY ========================== */}
            <h2 className='text-green'>Secret List</h2>
    {/* ==================================================== */}

            {state.secretList.length ? (
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
            )}

        </div>
    );
};

export default SecretList;
