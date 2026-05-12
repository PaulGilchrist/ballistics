import React from 'react';
import './form.css'

const ItemList = ({items, onAdd, onSelect, title, addItemLabel}) => {
    if(!items) {
        return null;
    }
    return (
        <div className="bal-form">
            <div className="card">
                <div className="card-heading d-flex p-2">
                    {title}
                </div>
                <div className={`card-body`}>
                    <ul className="list-inline">
                        {items.map((item) => (
                            <li onClick={() => onSelect(item)} className='card' key={item.id}>
                                <div className="well">
                                    {item.name}
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
                <div className={`card-footer`}>
                    <button className="btn btn-default" onClick={() => onAdd()}><span className="fa fa-plus"></span> {addItemLabel}</button>&nbsp;
                </div>
            </div>
        </div>
    );
}

export default ItemList;
