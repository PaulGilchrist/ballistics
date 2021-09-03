import React, { useState } from 'react';
import './form.css'

const Rounds = ({rounds, onAdd, onSelect}) => {
    const [isOpen, setIsOpen] = useState(true);
    return (
        <div className="bal-form">
            <div className="card">
                <div className="card-heading bg-dark text-light d-flex p-2">
                    Select Round
                    <i className={`fa fa-fw ml-auto ${isOpen ? 'fa-chevron-down' : 'fa-chevron-right'}`} onClick={() => setIsOpen(!isOpen)}></i>
                </div>
                <div className={`card-body ${!isOpen ? 'collapse' : null}`}>
                    <ul className="list-inline">
                        {rounds.map((round) => (
                            <li onClick={() => onSelect(round)} className='card' key={round.id}>
                                <div className="well">
                                    {round.name}
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
                <div className={`card-footer ${!isOpen ? 'collapse' : null}`}>
                    <button className="btn btn-default" onClick={() => onAdd()}><span className="fa fa-plus"></span> Add Round</button>&nbsp;
                </div>
            </div>
        </div>
    );
}

export default Rounds;
