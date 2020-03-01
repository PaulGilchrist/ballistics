import React, { useState } from 'react';

const Firearm = (props) => {
    /*
    props = {
        firearm: {
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
        }
        onSubmit()
    }
    */
    const [isOpen, setIsOpen] = useState(true);
    return (
        <div className="card">
            <div className="card-heading bg-dark text-light d-flex p-2">
                { props.firearm.id==='Add' ? `Add Firearm` : `Firearm - ${props.firearm.name}`}
                <i className={`fa fa-fw ml-auto ${isOpen ? 'fa-chevron-down' : 'fa-chevron-right'}`} onClick={() => setIsOpen(!isOpen)}></i>
            </div>
            <div className={`card-body ${!isOpen ? 'collapse' : null}`}>
            </div>
            <div className={`card-footer ${!isOpen ? 'collapse' : null}`}>
            </div>
        </div>
    );
}

export default Firearm;
