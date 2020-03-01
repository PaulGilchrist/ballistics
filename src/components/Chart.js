import React, { useState } from 'react';

const Chart = (props) => {
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
        round: {
            id
            name
            bulletDiameterInches
            bulletWeightGrains
            muzzleVelocityFPS
        }
        target: {
            distanceUnits // Yards or Meters
            distance
            chartStepping
            sizeInches
            sizeMils
            slantDegrees
            speedMPH
        }
        weather: {
            altitudeFeet
            temperatureDegreesFahrenheit
            barometricPressureInchesHg
            relativeHumidityPercent
            windVelocityMPH
            windAngleDegrees
        }    }
    */
    const [isOpen, setIsOpen] = useState(true);
    const showMil = true;
    const showMoA = true;
    const showIPHY = true;
    return (
        <div className="card">
            <div className="card-heading bg-dark text-light d-flex p-2">
                Range Chart - Firearm ({props.firearm.name}) - Round ({props.round.name})
                <i className={`fa fa-fw ml-auto ${isOpen ? 'fa-chevron-down' : 'fa-chevron-right'}`} onClick={() => setIsOpen(!isOpen)}></i>
            </div>
            <div className={`card-body ${!isOpen ? 'collapse' : null}`}>
                <div className="table-responsive">
                    <table className="table table-condensed table-striped table-hover font-size-small">
                        <thead>
                            <tr>
                                <th data-toggle="tooltip" title="Range in yards from the muzzle to the bullet">
                                    Range<br/>{props.target.distanceUnits==='Yards' ? '(yards)': '(meters)'}
                                </th>
                                <th data-toggle="tooltip" title="Velocity of the bullet in feet per second">
                                    Velocity<br/>(FPS)
                                </th>
                                <th className="d-none d-sm-table-cell" data-toggle="tooltip" title="Energy of the bullet on impact">
                                    Energy<br/>(FtLbs)
                                </th>
                                <th className="d-none d-sm-table-cell" data-toggle="tooltip" title="Time the bullet has been in flight since leaving the muzzle">
                                    Time<br/>(sec)
                                </th>
                                <th className="d-none d-sm-table-cell" data-toggle="tooltip" title="Amount of bullet drop in relation to the muzzle angle not the ground">
                                    Drop<br/>(inch)
                                </th>
                                <th className='d-none d-md-table-cell' data-toggle="tooltip" title="Bullet elevation above or below the target centerline">
                                    Elevation<br/>(inch)
                                </th>
                                { showMil ? 
                                    <th data-toggle="tooltip" title="Bullet elevation above or below the target centerline">
                                        Elevation<br/>(Mil)
                                    </th>
                                    : null
                                }
                                { showMoA ? 
                                    <th data-toggle="tooltip" title="Bullet elevation above or below the target centerline">
                                        Elevation<br/>(MoA)
                                    </th>
                                    : null
                                }
                                { showIPHY ? 
                                    <th data-toggle="tooltip" title="Bullet elevation above or below the target centerline">
                                        Elevation<br/>(IPHY)
                                    </th>
                                    : null
                                }
                                <th className='d-none d-md-table-cell' data-toggle="tooltip" title="Bullet drift left or right of the target centerline.  Drift is calculated at 90 degrees with velocity automatically adjusted from original wind direction.">
                                    Wind<br/>
                                    {props.weather.windVelocityMPH} MPH<br/>
                                    {props.weather.windAngleDegrees} deg<br/>
                                    (inch)
                                </th>
                                { showMil ? 
                                    <th data-toggle="tooltip" title="Bullet drift left or right of the target centerline.  Drift is calculated at 90 degrees with velocity automatically adjusted from original wind direction.">
                                        Wind<br/>
                                        {props.weather.windVelocityMPH} MPH<br/>
                                        {props.weather.windAngleDegrees} deg<br/>
                                        (Mil)
                                    </th>
                                    : null
                                }
                                { showMoA ? 
                                    <th data-toggle="tooltip" title="Bullet drift left or right of the target centerline.  Drift is calculated at 90 degrees with velocity automatically adjusted from original wind direction.">
                                        Wind<br/>
                                        {props.weather.windVelocityMPH} MPH<br/>
                                        {props.weather.windAngleDegrees} deg<br/>
                                        (MoA)
                                    </th>
                                    : null
                                }
                                { showIPHY ? 
                                    <th data-toggle="tooltip" title="Bullet drift left or right of the target centerline.  Drift is calculated at 90 degrees with velocity automatically adjusted from original wind direction.">
                                        Wind<br/>
                                        {props.weather.windVelocityMPH} MPH<br/>
                                        {props.weather.windAngleDegrees} deg<br/>
                                        (IPHY)
                                    </th>
                                    : null
                                }
                                <th className='d-none d-md-table-cell' data-toggle="tooltip" title="Amount of distance a moving target will cover during the time it takes for the bullet to travel from the muzzle to the target.">
                                    Lead<br/>
                                    {props.target.speedMPH} MPH<br/>
                                    (inch)
                                </th>
                                { showMil ? 
                                    <th data-toggle="tooltip" title="Amount of distance a moving target will cover during the time it takes for the bullet to travel from the muzzle to the target.">
                                        Lead<br/>
                                        {props.target.speedMPH} MPH<br/>
                                        (Mil)
                                    </th>
                                    : null
                                }
                                { showMoA ? 
                                    <th data-toggle="tooltip" title="Amount of distance a moving target will cover during the time it takes for the bullet to travel from the muzzle to the target.">
                                        Lead<br/>
                                        {props.target.speedMPH} MPH<br/>
                                        (MoA)
                                    </th>
                                    : null
                                }
                                { showIPHY ? 
                                    <th data-toggle="tooltip" title="Amount of distance a moving target will cover during the time it takes for the bullet to travel from the muzzle to the target.">
                                        Lead<br/>
                                        {props.target.speedMPH} MPH<br/>
                                        (IPHY)
                                    </th>
                                    : null
                                }
                                <th className='d-none d-md-table-cell' data-toggle="tooltip" title="Amount you will need to hold low on a target that is of either a higher or lower elevation than the shooting position.  Always aim low for both up and down slants.">
                                    Slant<br/>
                                    {props.target.slantDegrees} deg<br/>
                                    (inch)
                                </th>
                                { showMil ? 
                                    <th data-toggle="tooltip" title="Amount you will need to hold low on a target that is of either a higher or lower elevation than the shooting position.  Always aim low for both up and down slants.">
                                        Slant<br/>
                                        {props.target.slantDegrees} deg<br/>
                                        (Mil)
                                    </th>
                                    : null
                                }
                                { showMoA ? 
                                    <th data-toggle="tooltip" title="Amount you will need to hold low on a target that is of either a higher or lower elevation than the shooting position.  Always aim low for both up and down slants.">
                                        Slant<br/>
                                        {props.target.slantDegrees} deg<br/>
                                        (MoA)
                                    </th>
                                    : null
                                }
                                { showIPHY ? 
                                    <th data-toggle="tooltip" title="Amount you will need to hold low on a target that is of either a higher or lower elevation than the shooting position.  Always aim low for both up and down slants.">
                                        Slant<br/>
                                        {props.target.slantDegrees} deg<br/>
                                        (IPHY)
                                    </th>
                                    : null
                                }
                            </tr>
                        </thead>
                        <tbody>
                        </tbody>
                    </table>
                </div>
            </div>
            <div className="card-footer text-light d-flex p-2 justify-content-around">
                <span className="text-warning">Orange text denotes transnonic flight</span>
                <span className="text-danger">Red text denotes subsonic flight</span>
            </div>
        </div>
    );
}

export default Chart;
