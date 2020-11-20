import React, {useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { jsPDF } from 'jspdf';
// eslint-disable-next-line no-unused-vars
import autoTable from 'jspdf-autotable';

import {
    // Actions
    deleteFirearm,
    deleteRound,
    insertFirearm,
    insertRound,
    selectFirearm,
    selectRound,
    updateFirearm,
    updateFirearms,
    updateRound,
    updateTarget,
    updateWeather,
    // Selectors
    selectorFirearmId,
    selectorFirearms,
    selectorRoundId,
    selectorTarget,
    selectorWeather
} from './appSlice';

import {toast}  from 'react-toastify' // Must be initialized in App.js (see https://github.com/fkhadra/react-toastify#usage)
import ballistics from 'pg-ballistics'
import utilities from 'pg-utilities'
import 'react-toastify/dist/ReactToastify.min.css';

import 'animate.css/animate.min.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css';
import 'react-toastify/dist/ReactToastify.min.css';
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
    // Call it once in your app. At the root of your app is the best place
    toast.configure();

    // Getter functions (all should be pure functions)
    const getFirearm = (firearms, firearmId) => {
        // Get firearm from firearms array using firearmId
        let firearm = null;
        if(firearmId != null) {
            if(firearmId==='Add') {
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
                firearm = firearms.find((f) => f.id===firearmId);
            }
        }
        return firearm;
    }
    const getRound = (firearm, roundId) => {
        // Get round from firearm.rounds array using roundId
        let round = null;
        if(firearm != null && roundId != null) {
            if(roundId==='Add') {
                round = {
                    id: 'Add',
                    name: '',
                    bulletDiameterInches: null,
                    bulletWeightGrains: null,
                    muzzleVelocityFPS: null
                }
            } else if(firearm.rounds && firearm.rounds.length>0) {
                round = firearm.rounds.find((r) => r.id===roundId);
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
                console.log(`Imported State`);
                console.log(importedState);
                dispatch(updateFirearms(importedState.firearms));
                dispatch(updateTarget(importedState.target));
                dispatch(updateWeather(importedState.weather));
                dispatch(selectFirearm(importedState.firearmId));
                dispatch(selectRound(importedState.roundId));
            };
            reader.readAsText(event.target.files[0]);
        }
    }
    const handleDataExport = () => {
        const json = JSON.stringify({
            firearmId: firearmId,
            firearms: firearms,
            roundId: roundId,
            target: target,
            weather: weather
        });
        const blob = new Blob([json],{type:'application/json'});
        const href = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = href;
        link.download = 'ballisticsData.json';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }
    const handleFirearmOnAdd = () => {
        dispatch(selectRound(null));
        dispatch(selectFirearm('Add'));
    }
    const handleFirearmOnClose = () => {
        dispatch(selectRound(null));
        dispatch(selectFirearm(null));
    }
    const handleFirearmOnDelete = (firearm) => {
        ////////////////////////////////////////////////////////////////////////////////
        /////////////////////////// NEED CONFIRMATION DIALOG ///////////////////////////
        ////////////////////////////////////////////////////////////////////////////////
        if(firearms.find((f) => f.id===firearm.id) === undefined) {
            toast.error(`Firearm Not Found`, {
                distance: "top-center",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true
            });
        } else {
            if(firearmId===firearm.id) {
                dispatch(selectRound(null));
                dispatch(selectFirearm(null));
            }
            dispatch(deleteFirearm(firearm.id));
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
    const handleFirearmOnSelect = (firearm) => {
        dispatch(selectFirearm(firearm.id));
    }
    const handleFirearmOnSubmit = (firearm) => {
        // Find by name rather than id to ensure the name remains unique
        if(firearms.find((f) => f.name===firearm.name) !== undefined) {
            toast.error(`Name already exists - Firearm not added`, {
                distance: "top-center",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true
            });
        } else if(firearm.id==='Add') {
            dispatch(insertFirearm(firearm));
            dispatch(selectFirearm(firearm.id));
            toast.success(`Firearm Added`, {
                distance: "top-center",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true
            });
        } else {
            dispatch(updateFirearm(firearm));
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
    const handleGraphTypeChange = (firearm, round) => {
        graphType==='line' ? setGraphType('bar') : setGraphType('line');
    }
    const handleOnPrintChart = (firearm, round) => {
        console.log('print');
        const pdf = new jsPDF('p', 'mm', 'a4');
        pdf.text([`Range Chart - Firearm (${firearm.name}) - Round (${round.name})`, ``], 104, 10, { align: 'center'});
        pdf.autoTable({ html: '#ballisticsTable', margin: 1, startY: 20, styles: { fontSize: 9, cellPadding: 1 }});
        const pdfString = pdf.output('datauristring');
        const embed = `<embed width='100%' height='100%' src='${pdfString}'/>`;
        const x = window.open();
        x.document.open();
        x.document.write(embed);
        x.document.close();
        // pdf.save(`Range Chart - Firearm (${firearm.name}) - Round (${round.name}).pdf`);
    }
    const handleRoundOnAdd = () => {
        dispatch(selectRound('Add'));
    }
    const handleRoundOnClose = () => {
        dispatch(selectRound(null));
    }
    const handleRoundOnDelete = (firearmId, round) => {
        ////////////////////////////////////////////////////////////////////////////////
        /////////////////////////// NEED CONFIRMATION DIALOG ///////////////////////////
        ////////////////////////////////////////////////////////////////////////////////
        const firearmIndex = firearms.findIndex((f) => f.id===firearmId);
        if(firearmIndex === -1) {
            toast.error(`Firearm Not Found`, {
                distance: "top-center",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true
            });
        } else {
            if(firearms[firearmIndex].find((r) => r.id===round.id) === undefined) {
                toast.error(`Round Not Found`, {
                    distance: "top-center",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true
                });
            } else {
                if(roundId===round.id) {
                    dispatch(selectRound(null));
                }
                dispatch(deleteRound({firearmId: firearmId, roundId: round.id}));
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
    const handleRoundOnSelect = (round) => {
        dispatch(selectRound(round.id));
    }
    const handleRoundOnSubmit = (firearmId, round) => {
        const firearmIndex = firearms.findIndex((f) => f.id===firearmId);
        if(firearmIndex === -1) {
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
            if(firearms[firearmIndex].rounds.find((r) => r.name===round.name) !== undefined) {
                toast.error(`Name already exists - Round not added`, {
                    distance: "top-center",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true
                });
            } else if(round.id==='Add') {
                dispatch(insertRound(round));
                dispatch(selectRound(round.id));
                toast.success(`Firearm Added`, {
                    distance: "top-center",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true
                });
            } else {
                dispatch(updateRound(round));
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
    const handleTargetOnSubmit = (values) => {
        // Don't save sizeMils
        values.sizeMils = null;
        dispatch(updateTarget(values));
        toast.success(`Target Data Saved`, {
            distance: "top-center",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true
        });
    }
    const handleWeatherOnSubmit = (values) => {
        dispatch(updateWeather(values));
        toast.success('Weather Data Saved', {
            position: "top-center",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true
        });
    }
    // Get watched data
    const dispatch = useDispatch();
    let firearmId = useSelector(selectorFirearmId);
    let firearms = useSelector(selectorFirearms);
    let roundId = useSelector(selectorRoundId);
    let target = useSelector(selectorTarget);
    let weather = useSelector(selectorWeather);
    const [graphType, setGraphType] = useState('line');
    // Get unwatched data
    let firearm = getFirearm(firearms, firearmId);
    let round = getRound(firearm, roundId);
    let rangeData = ballistics.getRangeData(weather, target, firearm, round);
    const graphHeight = 300;
	const graphWidth = 300;
    console.log(firearmId);
    console.log(firearm);
    // Render UI
    return (
        <div className={`container-fluid ${css.app}`}>
            <div>
                <label className="btn btn-info" onChange={handleDataImport}>
                    Import <input type="file" multiple={false} accept=".json" hidden />
                </label>
                &nbsp;
                <label className="btn btn-info" onClick={handleDataExport}>Export</label>
            </div>
            <div className="d-flex flex-row flex-wrap justify-content-center">
                <Weather values={weather} onSubmit={(values) => handleWeatherOnSubmit(values)}/>
                <Target values={target} onSubmit={(values) => handleTargetOnSubmit(values)}/>
                {firearmId===null ?
                    <Firearms firearms={firearms} onAdd={() => handleFirearmOnAdd()} onSelect={(firearm) => handleFirearmOnSelect(firearm)}/>
                    :
                    <React.Fragment>
                        <Firearm firearm={firearm} onClose={() => handleFirearmOnClose()} onDelete={(firearm) => handleFirearmOnDelete(firearm)} onSubmit={(firearm) => handleFirearmOnSubmit(firearm)}/>
                        {firearmId!=='Add' ? round==null ?
                            <Rounds rounds={firearm.rounds} onAdd={() => handleRoundOnAdd()} onSelect={(round) => handleRoundOnSelect(round)}/>
                            :
                            <Round round={round} onClose={() => handleRoundOnClose()} onDelete={(round) => handleRoundOnDelete(firearm.id, round)} onSubmit={(round) => handleRoundOnSubmit(round)}/>
                            : null
                        }
                    </React.Fragment>
                }
            </div>
            <div className="d-flex flex-fill justify-content-center">
                {firearm && round && roundId!=='Add' ?
                    <Chart firearm={firearm} rangeData={rangeData} round={round} target={target} weather={weather} onPrintChart={() => handleOnPrintChart(firearm, round)}/>
                    : null
                }
            </div>
            {firearm && round && roundId!=='Add' ?
                <React.Fragment>
                    <br/>
                    <button className='btn btn-success' onClick={handleGraphTypeChange}>Change Graph Type</button>
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
