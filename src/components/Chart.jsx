import React from 'react';
import './Chart.css'
import atmospherics from './../utils/atmospherics';

function getColumns(config, rangeData) {
    const { distanceUnits, windVelocityMph, windAngleDegrees, slantDegrees, speedMph, showMil, showMoA, showIPHY, bothMil, bothInches } = config;

    function unitVariants(showMil, showMoA, showIPHY, keyPrefix, headerFn, bodyFn) {
        const variants = [];
        if (showMil) variants.push({ key: `${keyPrefix}-mil`, th: headerFn('Mil'), td: bodyFn('Mil') });
        if (showMoA) variants.push({ key: `${keyPrefix}-moa`, th: headerFn('MoA'), td: bodyFn('MoA') });
        if (showIPHY) variants.push({ key: `${keyPrefix}-iphys`, th: headerFn('IPHY'), td: bodyFn('IPHY') });
        return variants;
    }

    const columns = [];

    // Range
    columns.push({
        key: 'range',
        th: <th data-bs-toggle="tooltip" title="Range in yards from the muzzle to the bullet">
            Range<br />{distanceUnits === 'Yards' ? '(yards)' : '(meters)'}
        </th>,
        td: (d) => <td>{distanceUnits === 'Yards' ? d.rangeYards : d.rangeMeters}</td>
    });

    // Velocity
    columns.push({
        key: 'velocity',
        th: <th data-bs-toggle="tooltip" title="Velocity of the bullet in feet per second">
            Velocity<br />(FPS)
        </th>,
        td: (d) => <td>{d.velocityFPS.toFixed(0)}</td>
    });

    // Energy
    columns.push({
        key: 'energy',
        th: <th className="d-none d-sm-table-cell" data-bs-toggle="tooltip" title="Energy of the bullet on impact">
            Energy<br />(FtLbs)
        </th>,
        td: (d) => <td className="d-none d-sm-table-cell">{d.energyFtLbs.toFixed(0)}</td>
    });

    // Time
    columns.push({
        key: 'time',
        th: <th className="d-none d-sm-table-cell" data-bs-toggle="tooltip" title="Time the bullet has been in flight since leaving the muzzle">
            Time<br />(sec)
        </th>,
        td: (d) => <td className="d-none d-sm-table-cell">{d.timeSeconds.toFixed(3)}</td>
    });

    // Drop
    if (!bothMil) {
        columns.push({
            key: 'drop',
            th: <th className="d-none d-xl-table-cell" data-bs-toggle="tooltip" title="Amount of bullet drop in relation to the muzzle angle not the ground">
                Drop<br />(inch)
            </th>,
            td: (d) => <td className="d-none d-xl-table-cell">{-d.dropInches.toFixed(1)}</td>
        });
    }

    // Elevation inch
    if (!bothMil) {
        columns.push({
            key: 'elevation-inches',
            th: <th className='d-none d-md-table-cell' data-bs-toggle="tooltip" title="Bullet elevation above or below the target centerline">
                Elevation<br />(inch)
            </th>,
            td: (d) => <td className='d-none d-md-table-cell'>{-d.verticalPositionInches.toFixed(1)}</td>
        });
    }

    // Elevation variants
    if (!bothInches) {
        columns.push(...unitVariants(showMil, showMoA, showIPHY, 'elevation',
            (unit) => <th data-bs-toggle="tooltip" title="Bullet elevation above or below the target centerline">
                Elevation<br />({unit})
            </th>,
            (unit) => (d) => <td>{-d[`verticalPosition${unit}`].toFixed(1)}</td>
        ));
    }

    // Wind inch
    if (!bothMil) {
        columns.push({
            key: 'wind-inches',
            th: <th className='d-none d-md-table-cell' data-bs-toggle="tooltip" title="Bullet drift left or right of the target centerline.  Drift is calculated at 90 degrees with velocity automatically adjusted from original wind direction.">
                Wind<br />
                {windVelocityMph} MPH<br />
                {windAngleDegrees} deg<br />
                (inch)
            </th>,
            td: (d) => <td className='d-none d-md-table-cell'>{d.crossWindDriftInches.toFixed(1)}</td>
        });
    }

    // Wind variants
    if (!bothInches) {
        columns.push(...unitVariants(showMil, showMoA, showIPHY, 'wind',
            (unit) => <th data-bs-toggle="tooltip" title="Bullet drift left or right of the target centerline.  Drift is calculated at 90 degrees with velocity automatically adjusted from original wind direction.">
                Wind<br />
                {windVelocityMph} MPH<br />
                {windAngleDegrees} deg<br />
                ({unit})
            </th>,
            (unit) => (d) => <td>{d[`crossWindDrift${unit}`].toFixed(1)}</td>
        ));
    }

    // Lead inch
    if (!bothMil) {
        columns.push({
            key: 'lead-inches',
            th: <th className='d-none d-md-table-cell' data-bs-toggle="tooltip" title="Amount of distance a moving target will cover during the time it takes for the bullet to travel from the muzzle to the target.">
                Lead<br />
                {speedMph} MPH<br />
                (inch)
            </th>,
            td: (d) => <td className='d-none d-md-table-cell'>{d.leadInches.toFixed(1)}</td>
        });
    }

    // Lead variants
    if (!bothInches) {
        columns.push(...unitVariants(showMil, showMoA, showIPHY, 'lead',
            (unit) => <th data-bs-toggle="tooltip" title="Amount of distance a moving target will cover during the time it takes for the bullet to travel from the muzzle to the target.">
                Lead<br />
                {speedMph} MPH<br />
                ({unit})
            </th>,
            (unit) => (d) => <td>{d[`lead${unit}`].toFixed(1)}</td>
        ));
    }

    // Slant inch
    if (!bothMil) {
        columns.push({
            key: 'slant-inches',
            th: <th className='d-none d-md-table-cell' data-bs-toggle="tooltip" title="Amount you will need to hold low on a target that is of either a higher or lower elevation than the shooting position.  Always aim low for both up and down slants.">
                Slant<br />
                {slantDegrees} deg<br />
                (inch)
            </th>,
            td: (d) => <td className='d-none d-md-table-cell'>{d.slantDropInches.toFixed(1)}</td>
        });
    }

    // Slant variants
    if (!bothInches) {
        columns.push(...unitVariants(showMil, showMoA, showIPHY, 'slant',
            (unit) => <th data-bs-toggle="tooltip" title="Amount you will need to hold low on a target that is of either a higher or lower elevation than the shooting position.  Always aim low for both up and down slants.">
                Slant<br />
                {slantDegrees} deg<br />
                ({unit})
            </th>,
            (unit) => (d) => <td>{d[`slant${unit}`].toFixed(1)}</td>
        ));
    }

    // Spin Drift (only if at least one row has a non-zero value)
    const hasSpinDrift = rangeData && rangeData.some(d => d.spinDriftInches >= 0.1);
    if (hasSpinDrift) {
        if (!bothMil) {
            columns.push({
                key: 'spin-drift-inches',
                th: <th className='d-none d-lg-table-cell' data-bs-toggle="tooltip" title="Lateral drift caused by the bullet's gyroscopic spin. Right-hand twist causes rightward drift.">
                    Spin Drift<br />(inch)
                </th>,
                td: (d) => <td className='d-none d-lg-table-cell'>{d.spinDriftInches.toFixed(1)}</td>
            });
        }

        if (!bothInches) {
            columns.push(...unitVariants(showMil, showMoA, showIPHY, 'spin-drift',
                (unit) => <th className='d-none d-lg-table-cell' data-bs-toggle="tooltip" title="Lateral drift caused by the bullet's gyroscopic spin. Right-hand twist causes rightward drift.">
                    Spin Drift<br />({unit})
                </th>,
                (unit) => (d) => <td className='d-none d-lg-table-cell'>{d[`spinDrift${unit}`].toFixed(1)}</td>
            ));
        }
    }

    // Coriolis inch
    if (!bothMil) {
        columns.push({
            key: 'coriolis-inches',
            th: <th className='d-none d-sm-table-cell' data-bs-toggle="tooltip" title="Lateral drift caused by the Earth's rotation (Coriolis effect). Significant at long range (&gt;800 yards).">
                Coriolis<br />(inch)
            </th>,
            td: (d) => <td className='d-none d-sm-table-cell'>{d.coriolisDriftInches.toFixed(1)}</td>
        });
    }

    // Coriolis variants
    if (!bothInches) {
        columns.push(...unitVariants(showMil, showMoA, showIPHY, 'coriolis',
            (unit) => <th className='d-none d-xl-table-cell' data-bs-toggle="tooltip" title="Lateral drift caused by the Earth's rotation (Coriolis effect). Significant at long range (&gt;800 yards).">
                Coriolis<br />({unit})
            </th>,
            (unit) => (d) => <td className='d-none d-xl-table-cell'>{d[`coriolisDrift${unit}`].toFixed(1)}</td>
        ));
    }

    return columns;
}

const Chart = ({ firearm, rangeData, round, targetData, weatherData, onExportChart, onPrintChart }) => {
    const { name: firearmName, reticleUnits, turretUnits } = firearm;
    const { name: roundName } = round;
    const { distanceUnits, slantDegrees, speedMph } = targetData;
    const { altitudeFeet, windVelocityMph, windAngleDegrees } = weatherData;

    const showMil = turretUnits === 'Mil' || reticleUnits === 'Mil';
    const showMoA = turretUnits === 'MoA' || reticleUnits === 'MoA';
    const showIPHY = turretUnits === 'IPHY' || reticleUnits === 'IPHY';
    const bothMil = reticleUnits === 'Mil' && turretUnits === 'Mil';
    const bothInches = reticleUnits === 'Inches' && turretUnits === 'Inches';
    const speedOfSound = atmospherics.speedOfSound(altitudeFeet);

    const columns = getColumns({
        distanceUnits, windVelocityMph, windAngleDegrees, slantDegrees, speedMph, showMil, showMoA, showIPHY, bothMil, bothInches
    }, rangeData);

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
                                <tr>{columns.map(col => React.cloneElement(col.th, { key: col.key }))}</tr>
                            </thead>
                            <tbody className='table-group-divider'>
                                {rangeData.map((d, index) => {
                                    const rowClass = d.velocityFPS <= speedOfSound
                                        ? 'text-danger'
                                        : d.velocityFPS <= speedOfSound * 1.2
                                            ? 'text-warning'
                                            : null;
                                    return (
                                        <tr key={index} className={rowClass}>
                                            {columns.map(col => React.cloneElement(col.td(d), { key: col.key }))}
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>
                <div className="card-footer card-footer-text d-flex p-2 justify-content-around">
                    <span className="chart-legend-warning">Orange text denotes transsonic flight</span>
                    <span className="chart-legend-danger">Red text denotes subsonic flight</span>
                </div>
            </div>
        </div>
    );
}

export default Chart;
