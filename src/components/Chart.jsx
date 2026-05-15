import React from 'react';
import './Chart.css'
import atmospherics from './../utils/atmospherics';
import conversions from '../utils/conversions';

function getColumns(config, rangeData) {
    const { distanceUnits, windVelocityMph, windAngleDegrees, slantDegrees, speedMph, showMil, showMoA, showIPHY, bothMil, bothInches } = config;

    function unitVariants(showMil, showMoA, showIPHY, keyPrefix, renderThFn, renderTdFn) {
        const variants = [];
        if (showMil) variants.push({ key: `${keyPrefix}-mil`, renderTh: renderThFn('Mil'), renderTd: renderTdFn('Mil') });
        if (showMoA) variants.push({ key: `${keyPrefix}-moa`, renderTh: renderThFn('MoA'), renderTd: renderTdFn('MoA') });
        if (showIPHY) variants.push({ key: `${keyPrefix}-iphys`, renderTh: renderThFn('IPHY'), renderTd: renderTdFn('IPHY') });
        return variants;
    }

    const columns = [];

    // Range
    columns.push({
        key: 'range',
        renderTh: (key) => <th key={key} data-bs-toggle="tooltip" title="Range in yards from the muzzle to the bullet">
            Range<br />{distanceUnits === 'Yards' ? '(yards)' : '(meters)'}
        </th>,
        renderTd: (key, d) => <td key={key}>{distanceUnits === 'Yards' ? d.rangeYards : d.rangeMeters}</td>
    });

    // Velocity
    columns.push({
        key: 'velocity',
        renderTh: (key) => <th key={key} data-bs-toggle="tooltip" title="Velocity of the bullet in feet per second">
            Velocity<br />(FPS)
        </th>,
        renderTd: (key, d) => <td key={key}>{d.velocityFPS.toFixed(0)}</td>
    });

    // Energy
    columns.push({
        key: 'energy',
        renderTh: (key) => <th key={key} className="d-none d-sm-table-cell" data-bs-toggle="tooltip" title="Energy of the bullet on impact">
            Energy<br />(FtLbs)
        </th>,
        renderTd: (key, d) => <td key={key} className="d-none d-sm-table-cell">{d.energyFtLbs.toFixed(0)}</td>
    });

    // Time
    columns.push({
        key: 'time',
        renderTh: (key) => <th key={key} className="d-none d-sm-table-cell" data-bs-toggle="tooltip" title="Time the bullet has been in flight since leaving the muzzle">
            Time<br />(sec)
        </th>,
        renderTd: (key, d) => <td key={key} className="d-none d-sm-table-cell">{d.timeSeconds.toFixed(3)}</td>
    });

    // Drop
    if (!bothMil) {
        columns.push({
            key: 'drop',
            renderTh: (key) => <th key={key} className="d-none d-xl-table-cell" data-bs-toggle="tooltip" title="Amount of bullet drop in relation to the muzzle angle not the ground">
                Drop<br />(inch)
            </th>,
            renderTd: (key, d) => <td key={key} className="d-none d-xl-table-cell">{-d.dropInches.toFixed(1)}</td>
        });
    }

    // Elevation inch
    if (!bothMil) {
        columns.push({
            key: 'elevation-inches',
            renderTh: (key) => <th key={key} className='d-none d-md-table-cell' data-bs-toggle="tooltip" title="Bullet elevation above or below the target centerline">
                Elevation<br />(inch)
            </th>,
            renderTd: (key, d) => <td key={key} className='d-none d-md-table-cell'>{-d.verticalPositionInches.toFixed(1)}</td>
        });
    }

    // Elevation variants
    if (!bothInches) {
        columns.push(...unitVariants(showMil, showMoA, showIPHY, 'elevation',
            (unit) => (key) => <th key={key} data-bs-toggle="tooltip" title="Bullet elevation above or below the target centerline">
                Elevation<br />({unit})
            </th>,
            (unit) => (key, d) => <td key={key}>{-d[`verticalPosition${unit}`].toFixed(1)}</td>
        ));
    }

    // Wind inch
    if (!bothMil) {
        columns.push({
            key: 'wind-inches',
            renderTh: (key) => <th key={key} className='d-none d-md-table-cell' data-bs-toggle="tooltip" title="Bullet drift left or right of the target centerline.  Drift is calculated at 90 degrees with velocity automatically adjusted from original wind direction.">
                Wind<br />
                {windVelocityMph} MPH<br />
                {windAngleDegrees} deg<br />
                (inch)
            </th>,
            renderTd: (key, d) => <td key={key} className='d-none d-md-table-cell'>{d.crossWindDriftInches.toFixed(1)}</td>
        });
    }

    // Wind variants
    if (!bothInches) {
        columns.push(...unitVariants(showMil, showMoA, showIPHY, 'wind',
            (unit) => (key) => <th key={key} data-bs-toggle="tooltip" title="Bullet drift left or right of the target centerline.  Drift is calculated at 90 degrees with velocity automatically adjusted from original wind direction.">
                Wind<br />
                {windVelocityMph} MPH<br />
                {windAngleDegrees} deg<br />
                ({unit})
            </th>,
            (unit) => (key, d) => <td key={key}>{d[`crossWindDrift${unit}`].toFixed(1)}</td>
        ));
    }

    // Lead inch
    if (!bothMil) {
        columns.push({
            key: 'lead-inches',
            renderTh: (key) => <th key={key} className='d-none d-md-table-cell' data-bs-toggle="tooltip" title="Amount of distance a moving target will cover during the time it takes for the bullet to travel from the muzzle to the target.">
                Lead<br />
                {speedMph} MPH<br />
                (inch)
            </th>,
            renderTd: (key, d) => <td key={key} className='d-none d-md-table-cell'>{d.leadInches.toFixed(1)}</td>
        });
    }

    // Lead variants
    if (!bothInches) {
        columns.push(...unitVariants(showMil, showMoA, showIPHY, 'lead',
            (unit) => (key) => <th key={key} data-bs-toggle="tooltip" title="Amount of distance a moving target will cover during the time it takes for the bullet to travel from the muzzle to the target.">
                Lead<br />
                {speedMph} MPH<br />
                ({unit})
            </th>,
            (unit) => (key, d) => <td key={key}>{d[`lead${unit}`].toFixed(1)}</td>
        ));
    }

    // Slant inch
    if (!bothMil) {
        columns.push({
            key: 'slant-inches',
            renderTh: (key) => <th key={key} className='d-none d-md-table-cell' data-bs-toggle="tooltip" title="Amount you will need to hold low on a target that is of either a higher or lower elevation than the shooting position.  Always aim low for both up and down slants.">
                Slant<br />
                {slantDegrees} deg<br />
                (inch)
            </th>,
            renderTd: (key, d) => <td key={key} className='d-none d-md-table-cell'>{d.slantDropInches.toFixed(1)}</td>
        });
    }

    // Slant variants
    if (!bothInches) {
        columns.push(...unitVariants(showMil, showMoA, showIPHY, 'slant',
            (unit) => (key) => <th key={key} data-bs-toggle="tooltip" title="Amount you will need to hold low on a target that is of either a higher or lower elevation than the shooting position.  Always aim low for both up and down slants.">
                Slant<br />
                {slantDegrees} deg<br />
                ({unit})
            </th>,
            (unit) => (key, d) => <td key={key}>{d[`slant${unit}`].toFixed(1)}</td>
        ));
    }

    // Spin Drift (only if at least one row has a non-zero value)
    const hasSpinDrift = rangeData && rangeData.some(d => d.spinDriftInches >= 0.1);
    if (hasSpinDrift) {
        if (!bothMil) {
            columns.push({
                key: 'spin-drift-inches',
                renderTh: (key) => <th key={key} className='d-none d-lg-table-cell' data-bs-toggle="tooltip" title="Lateral drift caused by the bullet's gyroscopic spin. Right-hand twist causes rightward drift.">
                    Spin Drift<br />(inch)
                </th>,
                renderTd: (key, d) => <td key={key} className='d-none d-lg-table-cell'>{d.spinDriftInches.toFixed(1)}</td>
            });
        }

        if (!bothInches) {
            columns.push(...unitVariants(showMil, showMoA, showIPHY, 'spin-drift',
                (unit) => (key) => <th key={key} className='d-none d-lg-table-cell' data-bs-toggle="tooltip" title="Lateral drift caused by the bullet's gyroscopic spin. Right-hand twist causes rightward drift.">
                    Spin Drift<br />({unit})
                </th>,
                (unit) => (key, d) => <td key={key} className='d-none d-lg-table-cell'>{d[`spinDrift${unit}`].toFixed(1)}</td>
            ));
        }
    }

    // Coriolis inch
    if (!bothMil) {
        columns.push({
            key: 'coriolis-inches',
            renderTh: (key) => <th key={key} className='d-none d-sm-table-cell' data-bs-toggle="tooltip" title="Lateral drift caused by the Earth's rotation (Coriolis effect). Significant at long range (&gt;800 yards).">
                Coriolis<br />(inch)
            </th>,
            renderTd: (key, d) => <td key={key} className='d-none d-sm-table-cell'>{d.coriolisDriftInches.toFixed(1)}</td>
        });
    }

    // Coriolis variants
    if (!bothInches) {
        columns.push(...unitVariants(showMil, showMoA, showIPHY, 'coriolis',
            (unit) => (key) => <th key={key} className='d-none d-xl-table-cell' data-bs-toggle="tooltip" title="Lateral drift caused by the Earth's rotation (Coriolis effect). Significant at long range (&gt;800 yards).">
                Coriolis<br />({unit})
            </th>,
            (unit) => (key, d) => <td key={key} className='d-none d-xl-table-cell'>{d[`coriolisDrift${unit}`].toFixed(1)}</td>
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
                        <table id="ballisticsTable" className="table table-condensed table-hover font-size-small">
                            <thead>
                                <tr>{columns.map(col => col.renderTh(col.key))}</tr>
                            </thead>
                            <tbody className='table-group-divider'>
                                {rangeData.map((d, index) => {
                                    const isEvenRow = conversions.isEven(index);
                                    const rowClass = d.velocityFPS <= speedOfSound
                                        ? 'text-danger'
                                        : d.velocityFPS <= speedOfSound * 1.2
                                            ? 'text-warning'
                                            : null;
                                    const combinedClass = isEvenRow ? (rowClass ? rowClass + ' row-even' : 'row-even') : (rowClass || '');
                                    return (
                                        <tr key={index} className={combinedClass}>
                                            {columns.map(col => col.renderTd(col.key, d))}
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
