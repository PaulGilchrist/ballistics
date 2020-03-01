import React, { useState } from 'react';

const Firearms = (props) => {
    /*
    props = {
        firearms: [{
            id 
	        name
	        elevationTurretGradients
	        reticleUnits
	        rounds
	        sightHeightInches
	        turretUnits
	        windageTurretGradients
	        zeroRangeUnits
	        zeroRange
        }]
        onAddFirearm()
        onSelectFirearm()
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
                        <li onClick={() => props.onSelectFirearm(firearm)} className='card' key={firearm.id}>
                            <div className="well">
                                {firearm.name}
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
            <div className={`card-footer ${!isOpen ? 'collapse' : null}`}>
                <button className="btn btn-default" onClick={() => props.onAddFirearm()}><span className="fa fa-plus"></span> Add Firearm</button>&nbsp;
            </div>
        </div>
    );
}

export default Firearms;
