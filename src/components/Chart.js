import React from 'react';
import './chart.css'
import atmospherics from 'pg-atmospherics';

const Chart = (props) => {
    /*
    props = {
        firearm: {
	        name
	        reticleUnits
	        turretUnits
            ...
        }
        rangeData: [{
            rangeMeters
            rangeYards
            velocityFPS
            energyFtLbs
            timeSeconds
            dropInches
            verticalPositionInches
            crossWindDriftInches
            leadInches
            slantDegrees
            // All the remaining properties are computed
            verticalPositionMil
            verticalPositionMoA
            verticalPositionIPHY
            crossWindDriftMil
            crossWindDriftMoA
            crossWindDriftIPHY
            leadMil
            leadMoA
            leadIPHY
            slantDropInches
            slantMil
            slantMoA
            slantIPHY
        }]
        round: {
            name
            ...
        }
        target: {
            distanceUnits // Yards or Meters
            slantDegrees
            speedMPH
            ...
        }
        weather: {
           -altitudeFeet
            -windVelocityMPH
            -windAngleDegrees
            ...
        }
    }]
    */
    const showMil = props.firearm.turretUnits==='Mil' || props.firearm.reticleUnits==='Mil';
    const showMoA = props.firearm.turretUnits==='MoA' || props.firearm.reticleUnits==='MoA';
    const showIPHY = props.firearm.turretUnits==='IPHY' || props.firearm.reticleUnits==='IPHY';
    const speedOfSound = atmospherics.speedOfSound(props.weather.altitudeFeet);
    return (
        <div className="bal-chart">
            <div className="card" id="chart">
                <div className="card-heading bg-dark text-light">
                    <span>Range Chart - Firearm ({props.firearm.name}) - Round ({props.round.name})</span>
                    <button className='btn btn-secondary' onClick={props.onPrintChart}> Print</button>
                </div>
                <div className="card-body">
                    <div className="table-responsive">
                        <table id="ballisticsTable" className="table table-condensed table-striped table-hover font-size-small">
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
                                    {showMil ? 
                                        <th data-toggle="tooltip" title="Bullet elevation above or below the target centerline">
                                            Elevation<br/>(Mil)
                                        </th>
                                        : null
                                    }
                                    {showMoA ? 
                                        <th data-toggle="tooltip" title="Bullet elevation above or below the target centerline">
                                            Elevation<br/>(MoA)
                                        </th>
                                        : null
                                    }
                                    {showIPHY ? 
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
                                    {showMil ? 
                                        <th data-toggle="tooltip" title="Bullet drift left or right of the target centerline.  Drift is calculated at 90 degrees with velocity automatically adjusted from original wind direction.">
                                            Wind<br/>
                                            {props.weather.windVelocityMPH} MPH<br/>
                                            {props.weather.windAngleDegrees} deg<br/>
                                            (Mil)
                                        </th>
                                        : null
                                    }
                                    {showMoA ? 
                                        <th data-toggle="tooltip" title="Bullet drift left or right of the target centerline.  Drift is calculated at 90 degrees with velocity automatically adjusted from original wind direction.">
                                            Wind<br/>
                                            {props.weather.windVelocityMPH} MPH<br/>
                                            {props.weather.windAngleDegrees} deg<br/>
                                            (MoA)
                                        </th>
                                        : null
                                    }
                                    {showIPHY ? 
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
                                    {showMil ? 
                                        <th data-toggle="tooltip" title="Amount of distance a moving target will cover during the time it takes for the bullet to travel from the muzzle to the target.">
                                            Lead<br/>
                                            {props.target.speedMPH} MPH<br/>
                                            (Mil)
                                        </th>
                                        : null
                                    }
                                    {showMoA ? 
                                        <th data-toggle="tooltip" title="Amount of distance a moving target will cover during the time it takes for the bullet to travel from the muzzle to the target.">
                                            Lead<br/>
                                            {props.target.speedMPH} MPH<br/>
                                            (MoA)
                                        </th>
                                        : null
                                    }
                                    {showIPHY ? 
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
                                    {showMil ? 
                                        <th data-toggle="tooltip" title="Amount you will need to hold low on a target that is of either a higher or lower elevation than the shooting position.  Always aim low for both up and down slants.">
                                            Slant<br/>
                                            {props.target.slantDegrees} deg<br/>
                                            (Mil)
                                        </th>
                                        : null
                                    }
                                    {showMoA ? 
                                        <th data-toggle="tooltip" title="Amount you will need to hold low on a target that is of either a higher or lower elevation than the shooting position.  Always aim low for both up and down slants.">
                                            Slant<br/>
                                            {props.target.slantDegrees} deg<br/>
                                            (MoA)
                                        </th>
                                        : null
                                    }
                                    {showIPHY ? 
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
                                {props.rangeData.map((range, index) => (
                                    <tr key={index} className={range.velocityFPS<=speedOfSound ? 'text-danger' : range.velocityFPS<=speedOfSound*1.2 && range.velocityFPS>speedOfSound ? 'text-warning' : null}>
                                        <td>{props.target.distanceUnits==='Yards' ? range.rangeYards : range.rangeMeters}</td>
                                        <td>{range.velocityFPS.toFixed(0)}</td>
                                        <td className="d-none d-sm-table-cell">{range.energyFtLbs.toFixed(0)}</td>
                                        <td className="d-none d-sm-table-cell">{range.timeSeconds.toFixed(3)}</td>
                                        <td className="d-none d-sm-table-cell">{range.dropInches.toFixed(1)}</td>
                                        <td className='d-none d-md-table-cell'>{range.verticalPositionInches.toFixed(1)}</td>
                                        {showMil ?
                                            <td>{range.verticalPositionMil.toFixed(1)}</td>
                                            : null
                                        }
                                        {showMoA ?
                                            <td>{range.verticalPositionMoA.toFixed(1)}</td>
                                            : null
                                        }
                                        {showIPHY ?
                                            <td>{range.verticalPositionIPHY.toFixed(1)}</td>
                                            : null
                                        }
                                        <td className='d-none d-md-table-cell'>{range.crossWindDriftInches.toFixed(1)}</td>
                                        {showMil ?
                                            <td>{range.crossWindDriftMil.toFixed(1)}</td>
                                            : null
                                        }
                                        {showMoA ?
                                            <td>{range.crossWindDriftMil.toFixed(1)}</td>
                                            : null
                                        }
                                        {showIPHY ?
                                            <td>{range.crossWindDriftMil.toFixed(1)}</td>
                                            : null
                                        }
                                        <td className='d-none d-md-table-cell'>{range.leadInches.toFixed(1)}</td>
                                        {showMil ?
                                            <td>{range.leadMil.toFixed(1)}</td>
                                            : null
                                        }
                                        {showMoA ?
                                            <td>{range.leadMil.toFixed(1)}</td>
                                            : null
                                        }
                                        {showIPHY ?
                                            <td>{range.leadMil.toFixed(1)}</td>
                                            : null
                                        }
                                        <td className='d-none d-md-table-cell'>{range.slantDropInches.toFixed(1)}</td>
                                        {showMil ?
                                            <td>{range.slantMil.toFixed(1)}</td>
                                            : null
                                        }
                                        {showMoA ?
                                            <td>{range.slantMil.toFixed(1)}</td>
                                            : null
                                        }
                                        {showIPHY ?
                                            <td>{range.slantMil.toFixed(1)}</td>
                                            : null
                                        }
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
                <div className="card-footer text-light d-flex p-2 justify-content-around">
                    <span className="text-warning">Orange text denotes transnonic flight</span>
                    <span className="text-danger">Red text denotes subsonic flight</span>
                </div>
            </div>
        </div>
    );
}

export default Chart;
