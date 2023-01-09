import React, { useState } from 'react';
import './form.css'

const Firearms = ({firearms, onAdd, onSelect}) => {
    return (
        <div className="bal-form">
            <div className="card">
                <div className="card-heading bg-dark text-light d-flex p-2">
                    Select Firearm
                </div>
                <div className={`card-body`}>
                    <ul className="list-inline">
                        {firearms.map((firearm) => (
                            <li onClick={() => onSelect(firearm)} className='card' key={firearm.id}>
                                <div className="well">
                                    {firearm.name}
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
                <div className={`card-footer`}>
                    <button className="btn btn-default" onClick={() => onAdd()}><span className="fa fa-plus"></span> Add Firearm</button>&nbsp;
                </div>
            </div>
        </div>
    );
}

export default Firearms;
