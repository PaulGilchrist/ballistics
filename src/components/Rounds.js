import React, { useState } from 'react';
import './form.css'

const Rounds = ({rounds, onAdd, onSelect}) => {
    if(!rounds) {
        return null;
    }
    return (
        <div className="bal-form">
            <div className="card">
                <div className="card-heading bg-dark text-light d-flex p-2">
                    Select Round
                </div>
                <div className={`card-body`}>
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
                <div className={`card-footer`}>
                    <button className="btn btn-default" onClick={() => onAdd()}><span className="fa fa-plus"></span> Add Round</button>&nbsp;
                </div>
            </div>
        </div>
    );
}

export default Rounds;
