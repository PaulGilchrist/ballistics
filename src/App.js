import React, { useState } from 'react';
import { jsPDF } from 'jspdf';
// eslint-disable-next-line no-unused-vars
import autoTable from 'jspdf-autotable';
import Papa from 'papaparse';
import { saveAs } from 'file-saver';

import FIREARMS from './data/firearms';

import { toast } from 'react-toastify'; // Must be initialized in App.js (see https://github.com/fkhadra/react-toastify#usage)
import ballistics from 'pg-ballistics';
import utilities from 'pg-utilities';

import css from './app.module.css';

import Chart from './components/Chart';
import D3Graph from './components/D3Graph';
import Firearm from './components/Firearm';
import Firearms from './components/Firearms';
import Round from './components/Round';
import Rounds from './components/Rounds';
import Target from './components/Target';
import Weather from './components/Weather';


const App = () => {
    // Get watched data
    const [graphType, setGraphType] = useState('line');
    // Firearms Array
    let initialfirearms = null;
    const firearmsJson = localStorage.getItem('firearms');
    if (firearmsJson) {
        initialfirearms = utilities.jsonParseNumbers(firearmsJson);
    } else {
        initialfirearms = FIREARMS;
        localStorage.setItem('firearms', JSON.stringify(initialfirearms));
    }
    const [firearms, setFirearms] = useState(initialfirearms);
    const deleteFirearm = (firearms, firearmId) => {
        const firearmIndex = firearms.findIndex((f) => f.id === firearmId);
        if (firearmIndex !== -1) {
            firearms.splice(firearmIndex, 1)
            updateFirearms(firearms);
        }
    }
    const deleteRound = (firearms, firearmId, roundId) => {
        const firearmIndex = firearms.findIndex((f) => f.id === firearmId);
        if (firearmIndex !== -1) {
            const roundIndex = firearms[firearmIndex].rounds.findIndex((r) => r.id === roundId);
            if (roundIndex !== -1) {
                firearms[firearmIndex].rounds.splice(roundIndex, 1);
                updateFirearms(firearms);
            }
        }
    }
    const insertFirearm = (firearms, firearm) => {
        if (firearm.id === 'Add') {
            // Make sure it does not already exist
            let firearmIndex = firearms.findIndex((f) => f.name === firearm.name);
            if (firearmIndex === -1) {
                firearm.id = utilities.guid();
                firearm.rounds = [];
                firearms.push(firearm);
                utilities.sort(firearms, 'name');
                updateFirearms(firearms);
           }
        }
    }
    const insertRound = (firearms, firearmId, round) => {
        const firearmIndex = firearms.findIndex((f) => f.id === firearmId);
        if (firearmIndex !== -1) {
            if (round.id === 'Add') {
                // Make sure it does not already exist
                let roundIndex = firearms[firearmIndex].rounds.findIndex((r) => r.name === round.name);
                if (roundIndex === -1) {
                    round.id = utilities.guid();
                    firearms[firearmIndex].rounds.push(round);
                    utilities.sort(firearms[firearmIndex].rounds, 'name');
                    updateFirearms(firearms);
                }
            }
        }
    }
    const updateFirearm = (firearms, firearm) => {
        const firearmIndex = firearms.findIndex((f) => f.id === firearm.id);
        if (firearmIndex !== -1) {
            // Do not update the rounds
            firearm.rounds = firearms[firearmIndex].rounds;
            firearms[firearmIndex] = firearm;
            updateFirearms(firearms);
        }
    }
    const updateFirearms = (firearms) => {
        setFirearms(firearms);
        localStorage.setItem('firearms', JSON.stringify(firearms));
    }
    const updateRound = (firearms, firearmId, round) => {
        console.log(round);
        const firearmIndex = firearms.findIndex((f) => f.id === firearmId);
        if (firearmIndex !== -1) {
            let roundIndex = firearms[firearmIndex].rounds.findIndex((r) => r.id === round.id);
            if (roundIndex !== -1) {
                firearms[firearmIndex].rounds[roundIndex] = round;
                updateFirearms(firearms);
            }
        }
    }
    // Target Data
    let initialTarget = null;
    const targetJson = localStorage.getItem('target');
    if(targetJson) {
        initialTarget = utilities.jsonParseNumbers(targetJson);
    } else {
        initialTarget = {
            chartStepping: 50,
            distance: 1000,
            distanceUnits: 'Yards', // Yards or Meters
            sizeInches: 40,
            sizeMils: null,
            slantDegrees: 45,
            speedMPH: 3
        };
        localStorage.setItem('target', JSON.stringify(initialTarget));
    }
    const [target, setTarget] = useState(initialTarget);
    const updateTarget = (target) => {
        setTarget(target);
        localStorage.setItem('target', JSON.stringify(target));
    }
    // Weather Data
    let initialWeather = null;
    const weatherJson = localStorage.getItem('weather');
    if(weatherJson) {
        initialWeather = utilities.jsonParseNumbers(weatherJson);
    } else {
        initialWeather = {
            altitudeFeet: 0,
            temperatureDegreesFahrenheit: 59,
            barometricPressureInchesHg: 29.53,
            relativeHumidityPercent: 78,
            windVelocityMPH: 10,
            windAngleDegrees: 90
        };
        localStorage.setItem('weather', JSON.stringify(initialWeather));
    }
    const [weather, setWeather] = useState(initialWeather);
    const updateWeather = (weather) => {
        setWeather(weather);
        localStorage.setItem('weather', JSON.stringify(weather));
    }
    // Firearm Selected
    const [firearmId, setFirearmId] = useState(localStorage.getItem('firearmId'));
    const selectFirearm = (firearms, firearmId) => {
        setFirearmId(null);
        localStorage.removeItem('firearmId');
        if (firearmId != null) {
            const firearmIndex = firearms.findIndex((f) => f.id === firearmId);
            if (firearmIndex !== -1 || firearmId === 'Add') {
                setFirearmId(firearmId);
                localStorage.setItem('firearmId', firearmId);
            }
        }
    }
    // Round Selected
    const [roundId, setRoundId] = useState(localStorage.getItem('roundId'));
    const selectRound = (firearms, firearmId, roundId) => {
        // action must pass roundId.  firearmId must already have been selected
        setRoundId(null);
        localStorage.removeItem('roundId');
        if (roundId != null) {
            const firearmIndex = firearms.findIndex((f) => f.id === firearmId);
            if (firearmIndex !== -1) {
                const roundIndex = firearms[firearmIndex].rounds.findIndex((r) => r.id === roundId);
                if (roundIndex !== -1 || roundId === 'Add') {
                    setRoundId(roundId);
                    localStorage.setItem('roundId', roundId);
                }
            }
        }
    }
    // Getter functions (all should be pure functions)
    const getFirearm = (firearms, firearmId) => {
       // Get firearm from firearms array using firearmId
        let firearm = null;
        if (firearmId != null) {
            if (firearmId === 'Add') {
                firearm = {
                    id: 'Add',
                    name: '',
                    elevationTurretGradients: 10,
                    reticleUnits: 'Mil',
                    rounds: [],
                    sightHeightInches: 2.0,
                    turretUnits: 'Mil',
                    windageTurretGradients: 10,
                    zeroRangeUnits: 'Yards',
                    zeroRange: 100
                }
            } else {
                firearm = firearms.find((f) => f.id === firearmId);
            }
        }
        return firearm;
    }
    const getRound = (firearm, roundId) => {
        // Get round from firearm.rounds array using roundId
        let round = null;
        if (firearm != null && roundId != null) {
            if (roundId === 'Add') {
                round = {
                    id: 'Add',
                    name: '',
                    bulletDiameterInches: null,
                    bulletWeightGrains: null,
                    muzzleVelocityFPS: null
                }
            } else if (firearm.rounds && firearm.rounds.length > 0) {
                round = firearm.rounds.find((r) => r.id === roundId);
            }
        }
        return round;
    }
    // Event Handlers
    const handleDataImport = (event) => {
        if (!event.target.files || event.target.files.length !== 1) {
            toast.error(`No file selected`, {
                distance: "top-center",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true
            });
        } else {
            const reader = new FileReader();
            reader.onloadend = () => {
                // handle data processing
                const importedState = utilities.jsonParseNumbers(reader.result.toString());
                // Remove old selections
                selectFirearm(null, null);
                selectRound(null, null, null);
                updateFirearms(importedState.firearms);
                updateTarget(importedState.target);
                updateWeather(importedState.weather);
                selectFirearm(firearms, importedState.firearmId);
                selectRound(firearms, firearmId, importedState.roundId);
            };
            reader.readAsText(event.target.files[0]);
        }
    }
    const handleDataExport = (firearms, firearmId, roundId, target, weather) => {
        const json = JSON.stringify({
            firearmId,
            firearms,
            roundId,
            target,
            weather
        });
        const blob = new Blob([json], { type: 'application/json' });
        saveAs(blob, 'ballisticsData.json');
    }
    const handleFirearmOnAdd = (firearms) => {
        selectRound(null, null, null);
        selectFirearm(firearms, 'Add');
    }
    const handleFirearmOnClose = () => {
        selectRound(null, null, null);
        selectFirearm(null, null);
    }
    const handleFirearmOnDelete = (firearms, firearm) => {
        ////////////////////////////////////////////////////////////////////////////////
        /////////////////////////// NEED CONFIRMATION DIALOG ///////////////////////////
        ////////////////////////////////////////////////////////////////////////////////
        if (firearms.find((f) => f.id === firearm.id) !== undefined) {
            selectRound(null, null, null);
            selectFirearm(null, null);
            deleteFirearm(firearms, firearm.id);
            toast.success(`Firearm Deleted`, {
                distance: "top-center",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true
            });
        }
    }
    const handleFirearmOnSelect = (firearms, firearm) => {
        selectFirearm(firearms, firearm.id);
    }
    const handleFirearmOnSubmit = (firearms, firearm) => {
        // Find by name rather than id to ensure the name remains unique
        if (firearm.id === 'Add') {
            if (firearms.find((f) => f.name === firearm.name) === undefined) {
                insertFirearm(firearms, firearm);
                selectFirearm(firearms, firearm.id);
                toast.success(`Firearm Added`, {
                    distance: "top-center",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true
                });
            }
        } else {
            updateFirearm(firearms, firearm);
            selectFirearm(firearms, firearm.id);
            toast.success(`Firearm Updated`, {
                distance: "top-center",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true
            });
        }
    }
    const handleGraphTypeChange = (graphType) => {
        graphType === 'line' ? setGraphType('bar') : setGraphType('line');
    }
    const handleOnExportChart = (firearm, round) => {
        const csvString = Papa.unparse(rangeData);
        const blob = new Blob([csvString], { type: 'text/csv;charset=utf-8;' });
        const fileName = `Range Chart - Firearm (${firearm.name}) - Round (${round.name}).csv`
        saveAs(blob, fileName);
    }
    const handleOnPrintChart = (firearm, round) => {
        const pdf = new jsPDF('p', 'mm', 'a4');
        pdf.text([`Range Chart - Firearm (${firearm.name}) - Round (${round.name})`, ``], 104, 10, { align: 'center' });
        pdf.autoTable({ html: '#ballisticsTable', margin: 1, startY: 20, styles: { fontSize: 9, cellPadding: 1 } });
        const pdfString = pdf.output('datauristring');
        const embed = `<embed width='100%' height='100%' src='${pdfString}'/>`;
        const x = window.open();
        x.document.open();
        x.document.write(embed);
        x.document.close();
        // pdf.save(`Range Chart - Firearm (${firearm.name}) - Round (${round.name}).pdf`);
    }
    const handleRoundOnAdd = (firearms, firearmId) => {
        selectRound(firearms, firearmId, 'Add');
    }
    const handleRoundOnClose = () => {
        selectRound(null, null, null);
    }
    const handleRoundOnDelete = (firearms, firearmId, round) => {
        ////////////////////////////////////////////////////////////////////////////////
        /////////////////////////// NEED CONFIRMATION DIALOG ///////////////////////////
        ////////////////////////////////////////////////////////////////////////////////
        const firearmIndex = firearms.findIndex((f) => f.id === firearmId);
        if (firearmIndex === -1) {
            toast.error(`Firearm Not Found`, {
                distance: "top-center",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true
            });
        } else {
            if (firearms[firearmIndex].rounds.find((r) => r.id === round.id) !== undefined) {
                if (roundId === round.id) {
                    selectRound(firearms, firearmId, null);
                }
                deleteRound(firearms, firearmId, round.id);
                toast.success(`Round Deleted`, {
                    distance: "top-center",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true
                });
            }
        }
    }
    const handleRoundOnSelect = (firearms, firearmId, round) => {
        selectRound(firearms, firearmId, round.id);
    }
    const handleRoundOnSubmit = (firearms, firearmId, round) => {
        const firearmIndex = firearms.findIndex((f) => f.id === firearmId);
        if (firearmIndex === -1) {
            toast.error(`Firearm Not Found`, {
                distance: "top-center",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true
            });
        } else {
            // Find by name rather than id to ensure the name remains unique
            if (round.id === 'Add') {
                if (firearms[firearmIndex].rounds.find((r) => r.name === round.name) === undefined) {
                    insertRound(firearms, firearmId, round);
                    selectRound(firearms, firearmId, round.id);
                    toast.success(`Firearm Added`, {
                        distance: "top-center",
                        autoClose: 2000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true
                    });
                }
            } else {
                updateRound(firearms, firearmId, round);
                selectRound(firearms, firearmId, round.id);
                toast.success(`Round Updated`, {
                    distance: "top-center",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true
                });
            }
        }
    }
    const handleTargetOnSubmit = (targetData) => {
        // Convert form strings back to numbers
        updateTarget({
            chartStepping: Number(targetData.chartStepping),
            distance: Number(targetData.distance),
            distanceUnits: targetData.distanceUnits,
            sizeInches: Number(targetData.sizeInches),
            sizeMils: null, // Don't save sizeMils
            slantDegrees: Number(targetData.slantDegrees),
            speedMPH: Number(targetData.speedMPH)
        });
        toast.success(`Target Data Saved`, {
            distance: "top-center",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true
        });
    }
    const handleWeatherOnSubmit = (weatherData) => {
        updateWeather(weatherData);
        toast.success('Weather Data Saved', {
            position: "top-center",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true
        });
    }

    // Get unwatched data
    let firearm = getFirearm(firearms, firearmId);
    let round = getRound(firearm, roundId);
    let rangeData = ballistics.getRangeData(weather, target, firearm, round);
    const graphHeight = 300;
    const graphWidth = 300;
    // Render UI
    return (
        <div className={`container-fluid ${css.app}`}>
            <div>
                <label className="btn btn-info" onChange={(event) => handleDataImport(event)}>
                    Import <input type="file" multiple={false} accept=".json" hidden />
                </label>
                &nbsp;
                <label className="btn btn-info" onClick={() => handleDataExport(firearms, firearmId, roundId, target, weather)}>Export</label>
            </div>
            <div className="d-flex flex-row flex-wrap justify-content-center">
                <Weather weatherData={weather} onSubmit={(weatherData) => handleWeatherOnSubmit(weatherData)} />
                <Target targetData={target} onSubmit={(targetData) => handleTargetOnSubmit(targetData)} />
                {firearmId === null ?
                    <Firearms firearms={firearms} onAdd={() => handleFirearmOnAdd(firearms)} onSelect={(firearm) => handleFirearmOnSelect(firearms, firearm)} />
                    :
                    <React.Fragment>
                        <Firearm firearm={firearm} onClose={() => handleFirearmOnClose()} onDelete={(firearm) => handleFirearmOnDelete(firearms, firearm)} onSubmit={(firearm) => handleFirearmOnSubmit(firearms, firearm)}/>
                        {firearmId !== 'Add' ? round == null ?
                            <Rounds rounds={firearm.rounds} onAdd={() => handleRoundOnAdd(firearms, firearmId)} onSelect={(round) => handleRoundOnSelect(firearms, firearmId, round)} />
                            :
                            <Round round={round} onClose={() => handleRoundOnClose()} onDelete={(round) => handleRoundOnDelete(firearms, firearm.id, round)} onSubmit={(round) => handleRoundOnSubmit(firearms, firearm.id, round)} />
                            : null
                        }
                    </React.Fragment>
                }
            </div>
            <div className="d-flex flex-fill justify-content-center">
                {firearm && round && roundId !== 'Add' ?
                    <Chart firearm={firearm} rangeData={rangeData} round={round} targetData={target} weatherData={weather} onExportChart={() => handleOnExportChart(firearm, round)} onPrintChart={() => handleOnPrintChart(firearm, round)} />
                    : null
                }
            </div>
            {firearm && round && roundId !== 'Add' ?
                <React.Fragment>
                    <br />
                    <button className='btn btn-success' onClick={() => handleGraphTypeChange(graphType)}>Change Graph Type</button>
                    <div className="d-flex flex-fill flex-row flex-wrap justify-content-center">
                        <div className="graph-inline">
                            <h4>Velocity (feet/sec)</h4>
                            <D3Graph type={graphType} data={rangeData} xKey="rangeYards" yKey="velocityFPS" width={graphWidth} height={graphHeight} labels="none" yToFixed={0} />
                        </div>
                        <div className="graph-inline">
                            <h4>Energy (foot pounds)</h4>
                            <D3Graph type={graphType} data={rangeData} xKey="rangeYards" yKey="energyFtLbs" width={graphWidth} height={graphHeight} labels="none" yToFixed={0} />
                        </div>
                        <div className="graph-inline">
                            <h4>Time (seconds)</h4>
                            <D3Graph type={graphType} data={rangeData} xKey="rangeYards" yKey="timeSeconds" width={graphWidth} height={graphHeight} labels="none" yToFixed={2} />
                        </div>
                        <div className="graph-inline">
                            <h4>Drop (inches)</h4>
                            <D3Graph type={graphType} data={rangeData} xKey="rangeYards" yKey="dropInches" width={graphWidth} height={graphHeight} labels="none" yToFixed={1} />
                        </div>
                        <div className="graph-inline">
                            <h4>Elevation (inches)</h4>
                            <D3Graph type={graphType} data={rangeData} xKey="rangeYards" yKey="verticalPositionInches" width={graphWidth} height={graphHeight} labels="none" yToFixed={1} />
                        </div>
                        <div className="graph-inline">
                            <h4>Cross Wind Drift (inches)</h4>
                            <D3Graph type={graphType} data={rangeData} xKey="rangeYards" yKey="crossWindDriftInches" width={graphWidth} height={graphHeight} labels="none" yToFixed={1} />
                        </div>
                        <div className="graph-inline">
                            <h4>Lead (inches)</h4>
                            <D3Graph type={graphType} data={rangeData} xKey="rangeYards" yKey="leadInches" width={graphWidth} height={graphHeight} labels="none" yToFixed={1} />
                        </div>
                        <div className="graph-inline">
                            <h4>Slant (inches - hold low)</h4>
                            <D3Graph type={graphType} data={rangeData} xKey="rangeYards" yKey="slantDropInches" width={graphWidth} height={graphHeight} labels="none" yToFixed={1} />
                        </div>
                    </div>
                </React.Fragment>
                : null
            }
        </div>
    );
}
export default App;
