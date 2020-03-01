import React, { useState } from 'react';

const Rounds = (props) => {
    /*
    props = {
        rounds: [{
            id
            name
            ...
        }]
        onAdd()
        onSelect()
    }
    */
    const [isOpen, setIsOpen] = useState(true);
    return (
        <div className="card">
            <div className="card-heading bg-dark text-light d-flex p-2">
                Select Round
                <i className={`fa fa-fw ml-auto ${isOpen ? 'fa-chevron-down' : 'fa-chevron-right'}`} onClick={() => setIsOpen(!isOpen)}></i>
            </div>
            <div className={`card-body ${!isOpen ? 'collapse' : null}`}>
                <ul className="list-inline">
                    {props.rounds.map((round) => (
                        <li onClick={() => props.onSelect(round)} className='card' key={round.id}>
                            <div className="well">
                                {round.name}
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
            <div className={`card-footer ${!isOpen ? 'collapse' : null}`}>
                <button className="btn btn-default" onClick={() => props.onAdd()}><span className="fa fa-plus"></span> Add Firearm</button>&nbsp;
            </div>
        </div>
    );
}

export default Rounds;
