import React, { useState } from 'react';

const Firearms = (props) => {
    /*
    props = {
        firearms: [{
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
                Select Firearm
                <i className={`fa fa-fw ml-auto ${isOpen ? 'fa-chevron-down' : 'fa-chevron-right'}`} onClick={() => setIsOpen(!isOpen)}></i>
            </div>
            <div className={`card-body ${!isOpen ? 'collapse' : null}`}>
                <ul className="list-inline">
                    {props.firearms.map((firearm) => (
                        <li onClick={() => props.onSelect(firearm)} className='card' key={firearm.id}>
                            <div className="well">
                                {firearm.name}
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
            <div className={`card-footer ${!isOpen ? 'collapse' : null}`} style={{position: 'absolute', bottom: 0, width: '100%'}}>
                <button className="btn btn-default" onClick={() => props.onAdd()}><span className="fa fa-plus"></span> Add Firearm</button>&nbsp;
            </div>
        </div>
    );
}

export default Firearms;
