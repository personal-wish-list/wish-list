import React from "react";
// import ReactDOM from 'react-dom';
import { Table } from "semantic-ui-react";
import ContentEditable from 'react-contenteditable';
import './wishlist-item.css';

import { formatUrl } from '../../utils/helpers';

const WishListItem = ({ item }) => {
    let {
        name,
        price,
        link,
        specialNote
    } = item;

    const handleChange = (e) => {
        const {
            currentTarget: {
                dataset: { column },
            },
            target: { value }
        } = e;

        console.log(`${column}: ${value}`);
    };

    // const handleEdit = (e) => {
    //     const {

    //     }
    // };

    const handleDelete = () => {
        console.log(`${name} deleted!`)
    };


    return (
        <Table.Row>
            <Table.Cell>
                <ContentEditable
                    html={name}
                    data-column='name'
                    className='content-editable item-name'
                    onChange={handleChange}
                />
            </Table.Cell>
            <Table.Cell>
                <ContentEditable
                    html={`$${price}`}
                    data-column='price'
                    className='content-editable item-price'
                    onChange={handleChange}
                />
            </Table.Cell>
            <Table.Cell>
                <a href={link} target='_blank' rel='noreferrer'>
                    <ContentEditable
                        html={formatUrl(link)}
                        data-column='name'
                        className='content-editable item-link'
                        onChange={handleChange}
                    />
                </a>
            </Table.Cell>
            <Table.Cell>
                <ContentEditable
                    html={specialNote}
                    data-column='specialNote'
                    className='content-editable item-note'
                    onChange={handleChange}
                />
            </Table.Cell>
            <Table.Cell>
                <button onClick={handleDelete}>Delete</button>
            </Table.Cell>
        </Table.Row>
    )

    // return (
    //     <div className="container">
    //         <div className="wishlist-item">
    //             <h3>
    //                 <ContentEditable
    //                     html={name}
    //                     className='content-editable'
    //                     onChange={handleEdit}
    //                 />
    //             </h3>
    //             <h4>${price}</h4>
    //             <a href={link}>{formatUrl(link)}</a>
    //             <p>{specialNote}</p>
    //             <div>
    //                 {/* <button onClick={handleEdit}>Edit</button> */}
    //                 <button onClick={handleDelete}>Delete</button>
    //             </div>
    //         </div>
    //     </div>
    // );
};

export default WishListItem;