import React from 'react';
import './chart.css'
import atmospherics from 'pg-atmospherics';

const Chart = ({firearm, rangeData, round, targetData, weatherData, onExportChart, onPrintChart}) => {
    const { name: firearmName, reticleUnits, turretUnits } = firearm;
    const { name: roundName } = round;
    const { distanceUnits, slantDegrees, speedMPH } = targetData;
    const { altitudeFeet, windVelocityMPH, windAngleDegrees } = weatherData;

    const showMil = turretUnits==='Mil' || reticleUnits==='Mil';
    const showMoA = turretUnits==='MoA' || reticleUnits==='MoA';
    const showIPHY = turretUnits==='IPHY' || reticleUnits==='IPHY';
    const speedOfSound = atmospherics.speedOfSound(altitudeFeet);
    return (
        <div className="bal-chart">
            <div className="card" id="chart">
                <div className="card-heading">
                    <span>Range Chart - Firearm ({firearmName}) - Round ({roundName})</span>
                    <div className='card-heading-spacer'></div>
                    <button className='btn btn-secondary card-heading-button' onClick={onExportChart}> Export</button>
                    <button className='btn btn-secondary card-heading-button' onClick={onPrintChart}> Print</button>
                </div>
                <div className="card-body">
                    <div className="table-responsive">
                        <table id="ballisticsTable" className="table table-condensed table-striped table-hover font-size-small">
                            <thead>
                                <tr>
                                    <th data-toggle="tooltip" title="Range in yards from the muzzle to the bullet">
                                        Range<br/>{distanceUnits==='Yards' ? '(yards)': '(meters)'}
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
                                        {windVelocityMPH} MPH<br/>
                                        {windAngleDegrees} deg<br/>
                                        (inch)
                                    </th>
                                    {showMil ? 
                                        <th data-toggle="tooltip" title="Bullet drift left or right of the target centerline.  Drift is calculated at 90 degrees with velocity automatically adjusted from original wind direction.">
                                            Wind<br/>
                                            {windVelocityMPH} MPH<br/>
                                            {windAngleDegrees} deg<br/>
                                            (Mil)
                                        </th>
                                        : null
                                    }
                                    {showMoA ? 
                                        <th data-toggle="tooltip" title="Bullet drift left or right of the target centerline.  Drift is calculated at 90 degrees with velocity automatically adjusted from original wind direction.">
                                            Wind<br/>
                                            {windVelocityMPH} MPH<br/>
                                            {windAngleDegrees} deg<br/>
                                            (MoA)
                                        </th>
                                        : null
                                    }
                                    {showIPHY ? 
                                        <th data-toggle="tooltip" title="Bullet drift left or right of the target centerline.  Drift is calculated at 90 degrees with velocity automatically adjusted from original wind direction.">
                                            Wind<br/>
                                            {windVelocityMPH} MPH<br/>
                                            {windAngleDegrees} deg<br/>
                                            (IPHY)
                                        </th>
                                        : null
                                    }
                                    <th className='d-none d-md-table-cell' data-toggle="tooltip" title="Amount of distance a moving target will cover during the time it takes for the bullet to travel from the muzzle to the target.">
                                        Lead<br/>
                                        {speedMPH} MPH<br/>
                                        (inch)
                                    </th>
                                    {showMil ? 
                                        <th data-toggle="tooltip" title="Amount of distance a moving target will cover during the time it takes for the bullet to travel from the muzzle to the target.">
                                            Lead<br/>
                                            {speedMPH} MPH<br/>
                                            (Mil)
                                        </th>
                                        : null
                                    }
                                    {showMoA ? 
                                        <th data-toggle="tooltip" title="Amount of distance a moving target will cover during the time it takes for the bullet to travel from the muzzle to the target.">
                                            Lead<br/>
                                            {speedMPH} MPH<br/>
                                            (MoA)
                                        </th>
                                        : null
                                    }
                                    {showIPHY ? 
                                        <th data-toggle="tooltip" title="Amount of distance a moving target will cover during the time it takes for the bullet to travel from the muzzle to the target.">
                                            Lead<br/>
                                            {speedMPH} MPH<br/>
                                            (IPHY)
                                        </th>
                                        : null
                                    }
                                    <th className='d-none d-md-table-cell' data-toggle="tooltip" title="Amount you will need to hold low on a target that is of either a higher or lower elevation than the shooting position.  Always aim low for both up and down slants.">
                                        Slant<br/>
                                        {slantDegrees} deg<br/>
                                        (inch)
                                    </th>
                                    {showMil ? 
                                        <th data-toggle="tooltip" title="Amount you will need to hold low on a target that is of either a higher or lower elevation than the shooting position.  Always aim low for both up and down slants.">
                                            Slant<br/>
                                            {slantDegrees} deg<br/>
                                            (Mil)
                                        </th>
                                        : null
                                    }
                                    {showMoA ? 
                                        <th data-toggle="tooltip" title="Amount you will need to hold low on a target that is of either a higher or lower elevation than the shooting position.  Always aim low for both up and down slants.">
                                            Slant<br/>
                                            {slantDegrees} deg<br/>
                                            (MoA)
                                        </th>
                                        : null
                                    }
                                    {showIPHY ? 
                                        <th data-toggle="tooltip" title="Amount you will need to hold low on a target that is of either a higher or lower elevation than the shooting position.  Always aim low for both up and down slants.">
                                            Slant<br/>
                                            {slantDegrees} deg<br/>
                                            (IPHY)
                                        </th>
                                        : null
                                    }
                                </tr>
                            </thead>
                            <tbody className='table-group-divider'>
                                {rangeData.map((rangeData, index) => {
                                    const { rangeMeters, rangeYards, velocityFPS, energyFtLbs, timeSeconds, dropInches, verticalPositionInches, crossWindDriftInches, leadInches, verticalPositionMil, verticalPositionMoA, verticalPositionIPHY, crossWindDriftMil, crossWindDriftMoA, crossWindDriftIPHY, leadMil, leadMoA, leadIPHY, slantDropInches, slantMil, slantMoA, slantIPHY } = rangeData;
                                    return (
                                        <tr key={index} className={velocityFPS<=speedOfSound ? 'text-danger' : velocityFPS<=speedOfSound*1.2 && velocityFPS>speedOfSound ? 'text-warning' : null}>
                                            <td>{distanceUnits==='Yards' ? rangeYards : rangeMeters}</td>
                                            <td>{velocityFPS.toFixed(0)}</td>
                                            <td className="d-none d-sm-table-cell">{energyFtLbs.toFixed(0)}</td>
                                            <td className="d-none d-sm-table-cell">{timeSeconds.toFixed(3)}</td>
                                            <td className="d-none d-sm-table-cell">{-dropInches.toFixed(1)}</td>
                                            <td className='d-none d-md-table-cell'>{-verticalPositionInches.toFixed(1)}</td>
                                            {showMil ?
                                                <td>{-verticalPositionMil.toFixed(1)}</td>
                                                : null
                                            }
                                            {showMoA ?
                                                <td>{-verticalPositionMoA.toFixed(1)}</td>
                                                : null
                                            }
                                            {showIPHY ?
                                                <td>{-verticalPositionIPHY.toFixed(1)}</td>
                                                : null
                                            }
                                            <td className='d-none d-md-table-cell'>{crossWindDriftInches.toFixed(1)}</td>
                                            {showMil ?
                                                <td>{crossWindDriftMil.toFixed(1)}</td>
                                                : null
                                            }
                                            {showMoA ?
                                                <td>{crossWindDriftMoA.toFixed(1)}</td>
                                                : null
                                            }
                                            {showIPHY ?
                                                <td>{crossWindDriftIPHY.toFixed(1)}</td>
                                                : null
                                            }
                                            <td className='d-none d-md-table-cell'>{leadInches.toFixed(1)}</td>
                                            {showMil ?
                                                <td>{leadMil.toFixed(1)}</td>
                                                : null
                                            }
                                            {showMoA ?
                                                <td>{leadMoA.toFixed(1)}</td>
                                                : null
                                            }
                                            {showIPHY ?
                                                <td>{leadIPHY.toFixed(1)}</td>
                                                : null
                                            }
                                            <td className='d-none d-md-table-cell'>{slantDropInches.toFixed(1)}</td>
                                            {showMil ?
                                                <td>{slantMil.toFixed(1)}</td>
                                                : null
                                            }
                                            {showMoA ?
                                                <td>{slantMoA.toFixed(1)}</td>
                                                : null
                                            }
                                            {showIPHY ?
                                                <td>{slantIPHY.toFixed(1)}</td>
                                                : null
                                            }
                                        </tr>
                                    );
                                })}
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
