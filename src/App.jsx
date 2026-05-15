// 06062025
import React, { useState, useEffect } from 'react';
import { jsPDF } from 'jspdf';
 
import autoTable from 'jspdf-autotable';
import Papa from 'papaparse';
import { saveAs } from 'file-saver';

import FIREARMS from './data/firearms';

import { toast } from 'react-toastify'; // Must be initialized in App.js (see https://github.com/fkhadra/react-toastify#usage)
import ballistics from './utils/ballistics';
import utilities from './utils/utilities';

import css from './App.module.css';
import config from './config';

import Chart from './components/Chart';
import Firearm from './components/Firearm';
import Firearms from './components/Firearms';
import Round from './components/Round';
import Rounds from './components/Rounds';
import Target from './components/Target';
import Weather from './components/Weather';

const showToast = (type, message) => {
  toast[type](message, config.TOAST_OPTIONS);
}

/**
 * Convert config UPPER_SNAKE_CASE keys to camelCase for state initialization.
 * e.g. ALTITUDE_FEET -> altitudeFeet, SPEED_MPH -> speedMph, WIND_VELOCITY_MPH -> windVelocityMph
 */
const convertConfigToCamelCase = (configObj) => {
    const camelCaseObj = {};
    for (const [key, value] of Object.entries(configObj)) {
        const camelKey = key.toLowerCase().replace(/_([a-z])/g, (match, letter) => letter.toUpperCase());
        camelCaseObj[camelKey] = value;
    }
    return camelCaseObj;
}

const App = () => {
    // Theme
    const [theme, setTheme] = useState(localStorage.getItem('theme') || 'dark');
    useEffect(() => {
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
    }, [theme]);
    const toggleTheme = () => {
        setTheme(theme === 'dark' ? 'light' : 'dark');
    }
    // Get watched data
    // Firearms Array
    const [firearms, setFirearms] = useState(() => {
        const firearmsJson = localStorage.getItem('firearms');
        if (firearmsJson) {
            return utilities.jsonParseNumbers(firearmsJson);
        }
        localStorage.setItem('firearms', JSON.stringify(FIREARMS));
        return FIREARMS;
    });
    const deleteFirearm = (firearms, firearmId) => {
        const filtered = firearms.filter(f => f.id !== firearmId);
        if (filtered.length !== firearms.length) {
            updateFirearms(filtered);
        }
    }
    const deleteRound = (firearms, firearmId, roundId) => {
        const newFirearms = firearms.map(firearm => {
            if (firearm.id === firearmId) {
                const filteredRounds = firearm.rounds.filter(r => r.id !== roundId);
                if (filteredRounds.length !== firearm.rounds.length) {
                    return { ...firearm, rounds: filteredRounds };
                }
            }
            return firearm;
        });
        if (newFirearms !== firearms) {
            updateFirearms(newFirearms);
        }
    }
    const insertFirearm = (firearms, firearm) => {
        if (firearm.id === 'Add') {
            // Make sure it does not already exist
            if (!firearms.find((f) => f.name === firearm.name)) {
                const newFirearm = { ...firearm, id: utilities.guid(), rounds: [] };
                const sortedFirearms = [...firearms, newFirearm].sort((a, b) => a.name.localeCompare(b.name));
                updateFirearms(sortedFirearms);
            }
        }
    }
    const insertRound = (firearms, firearmId, round) => {
        if (round.id === 'Add') {
            const newFirearms = firearms.map(firearm => {
                if (firearm.id === firearmId) {
                    if (!firearm.rounds.find((r) => r.name === round.name)) {
                        const newRound = { ...round, id: utilities.guid() };
                        const newRounds = [...firearm.rounds, newRound].sort((a, b) => a.name.localeCompare(b.name));
                        return { ...firearm, rounds: newRounds };
                    }
                }
                return firearm;
            });
            if (newFirearms !== firearms) {
                updateFirearms(newFirearms);
            }
        }
    }
    const updateFirearm = (firearms, firearm) => {
        const existingFirearm = firearms.find(f => f.id === firearm.id);
        if (existingFirearm) {
            const updatedFirearm = { ...firearm, rounds: existingFirearm.rounds };
            const newFirearms = firearms.map(f => f.id === firearm.id ? updatedFirearm : f);
            updateFirearms(newFirearms);
        }
    }
    const updateFirearms = (firearms) => {
        setFirearms(firearms);
        localStorage.setItem('firearms', JSON.stringify(firearms));
    }
    const updateRound = (firearms, firearmId, round) => {
        const newFirearms = firearms.map(firearm => {
            if (firearm.id === firearmId) {
                const existingRound = firearm.rounds.find(r => r.id === round.id);
                if (existingRound) {
                    const newRounds = firearm.rounds.map(r => r.id === round.id ? round : r);
                    return { ...firearm, rounds: newRounds };
                }
            }
            return firearm;
        });
        if (newFirearms !== firearms) {
            updateFirearms(newFirearms);
        }
    }
    // Target Data
    const [target, setTarget] = useState(() => {
        const targetJson = localStorage.getItem('target');
        if (targetJson) {
            return utilities.jsonParseNumbers(targetJson);
        }
        const defaults = { ...convertConfigToCamelCase(config.DEFAULTS.TARGET), sizeMils: null };
        localStorage.setItem('target', JSON.stringify(defaults));
        return defaults;
    });
    const updateTarget = (target) => {
        setTarget(target);
        localStorage.setItem('target', JSON.stringify(target));
    }
    // Weather Data
    const [weather, setWeather] = useState(() => {
        const weatherJson = localStorage.getItem('weather');
        if (weatherJson) {
            return utilities.jsonParseNumbers(weatherJson);
        }
        const defaults = convertConfigToCamelCase(config.DEFAULTS.WEATHER);
        localStorage.setItem('weather', JSON.stringify(defaults));
        return defaults;
    });
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
                    rounds: [],
                    ...convertConfigToCamelCase(config.DEFAULTS.FIREARM)
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
                    muzzleVelocityFPS: null,
                    dragModel: 'G1'
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
            showToast('error', 'No file selected');
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
                selectFirearm(importedState.firearms, importedState.firearmId);
                selectRound(importedState.firearms, importedState.firearmId, importedState.roundId);
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
        if (window.confirm(`Are you sure you want to delete "${firearm.name}"?`)) {
            if (firearms.find((f) => f.id === firearm.id)) {
                selectRound(null, null, null);
                selectFirearm(null, null);
                deleteFirearm(firearms, firearm.id);
                showToast('success', 'Firearm Deleted');
            }
        }
    }
    const handleFirearmOnSelect = (firearms, firearm) => {
        selectFirearm(firearms, firearm.id);
    }
    const handleFirearmOnSubmit = (firearms, firearm) => {
        // Find by name rather than id to ensure the name remains unique
        if (firearm.id === 'Add') {
            if (!firearms.find((f) => f.name === firearm.name)) {
                insertFirearm(firearms, firearm);
                selectFirearm(firearms, firearm.id);
                showToast('success', 'Firearm Added');
            }
        } else {
            updateFirearm(firearms, firearm);
            selectFirearm(firearms, firearm.id);
            showToast('success', 'Firearm Updated');
        }
    }
    const handleOnExportChart = (firearm, round) => {
        const csvString = Papa.unparse(rangeData);
        const blob = new Blob([csvString], { type: 'text/csv;charset=utf-8;' });
        const fileName = `Range Chart - Firearm (${firearm.name}) - Round (${round.name}).csv`
        saveAs(blob, fileName);
    }
    const handleOnPrintChart = async (firearm, round) => {
        const pdf = new jsPDF('p', 'mm', 'a4');
        pdf.text([`Range Chart - Firearm (${firearm.name}) - Round (${round.name})`, ``], 104, 10, { align: 'center' });
        await autoTable(pdf, { html: '#ballisticsTable', margin: 1, startY: 20, styles: { fontSize: 9, cellPadding: 1 } });
        const pdfBlob = pdf.output('blob');
        const pdfBlobUrl = URL.createObjectURL(pdfBlob);
        const x = window.open();
        x.location.href = pdfBlobUrl;
    }
    const handleRoundOnAdd = (firearms, firearmId) => {
        selectRound(firearms, firearmId, 'Add');
    }
    const handleRoundOnClose = () => {
        selectRound(null, null, null);
    }
    const handleRoundOnDelete = (firearms, firearmId, round) => {
        if (window.confirm(`Are you sure you want to delete "${round.name}"?`)) {
            const firearmIndex = firearms.findIndex((f) => f.id === firearmId);
            if (firearmIndex === -1) {
                showToast('error', 'Firearm Not Found');
            } else {
                if (firearms[firearmIndex].rounds.find((r) => r.id === round.id)) {
                    if (roundId === round.id) {
                        selectRound(firearms, firearmId, null);
                    }
                    deleteRound(firearms, firearmId, round.id);
            showToast('success', 'Round Deleted');
                }
            }
        }
    }
    const handleRoundOnSelect = (firearms, firearmId, round) => {
        selectRound(firearms, firearmId, round.id);
    }
    const handleRoundOnSubmit = (firearms, firearmId, round) => {
        const firearmIndex = firearms.findIndex((f) => f.id === firearmId);
        if (firearmIndex === -1) {
            showToast('error', 'Firearm Not Found');
        } else {
            // Find by name rather than id to ensure the name remains unique
            if (round.id === 'Add') {
                if (!firearms[firearmIndex].rounds.find((r) => r.name === round.name)) {
                    insertRound(firearms, firearmId, round);
                    selectRound(firearms, firearmId, round.id);
            showToast('success', 'Firearm Added');
                }
            } else {
                updateRound(firearms, firearmId, round);
                selectRound(firearms, firearmId, round.id);
            showToast('success', 'Round Updated');
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
            speedMph: Number(targetData.speedMph)
        });
        showToast('success', 'Target Data Saved');
    }
    const handleWeatherOnSubmit = (weatherData) => {
        updateWeather(weatherData);
        showToast('success', 'Weather Data Saved');
    }

    // Get unwatched data
    let firearm = getFirearm(firearms, firearmId);
    let round = getRound(firearm, roundId);
    let rangeData = ballistics.getRangeData(weather, target, firearm, round);
    // Render UI
    return (
        <div className={`container-fluid ${css.app}`}>
            <div>
                <label className="btn btn-info" onChange={(event) => handleDataImport(event)}>
                    Import <input type="file" multiple={false} accept=".json" hidden />
                </label>
                &nbsp;
                <label className="btn btn-info" onClick={() => handleDataExport(firearms, firearmId, roundId, target, weather)}>Export</label>
                &nbsp;
                <button className="theme-toggle-btn" onClick={toggleTheme}>
                    <i className={theme === 'dark' ? 'fa fa-sun-o' : 'fa fa-moon-o'}></i>
                </button>
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
        </div>
    );
}
export default App;
