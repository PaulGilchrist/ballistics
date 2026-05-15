import React, { useMemo } from 'react';
import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';
import Papa from 'papaparse';
import { saveAs } from 'file-saver';
import { toast } from 'react-toastify';
import ballistics from './utils/ballistics';
import css from './App.module.css';
import config from './config';
import Chart from './components/Chart';
import Firearm from './components/Firearm';
import Firearms from './components/Firearms';
import Round from './components/Round';
import Rounds from './components/Rounds';
import Target from './components/Target';
import Weather from './components/Weather';
import useTheme from './hooks/useTheme';
import useFirearms from './hooks/useFirearms';
import useTarget from './hooks/useTarget';
import useWeather from './hooks/useWeather';
import useSelection from './hooks/useSelection';
import useGetters from './hooks/useGetters';

const showToast = (type, message) => {
  toast[type](message, config.TOAST_OPTIONS);
}

const App = () => {
    const { theme, toggleTheme } = useTheme();
    const { firearms, updateFirearms, deleteFirearm, deleteRound, insertFirearm, insertRound, updateFirearm, updateRound } = useFirearms();
    const { target, updateTarget } = useTarget();
    const { weather, updateWeather } = useWeather();
    const { firearmId, roundId, selectFirearm, selectRound } = useSelection();
    const { getFirearm, getRound } = useGetters();

    // Event Handlers
    const handleDataImport = (event) => {
        if (!event.target.files || event.target.files.length !== 1) {
            showToast('error', 'No file selected');
        } else {
            const reader = new FileReader();
            reader.onloadend = () => {
                const importedState = JSON.parse(reader.result.toString());
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
    const handleDataExport = () => {
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
    const handleFirearmOnAdd = () => {
        selectRound(null, null, null);
        selectFirearm(firearms, 'Add');
    }
    const handleFirearmOnClose = () => {
        selectRound(null, null, null);
        selectFirearm(null, null);
    }
    const handleFirearmOnDelete = (firearm) => {
        if (window.confirm(`Are you sure you want to delete "${firearm.name}"?`)) {
            selectRound(null, null, null);
            selectFirearm(null, null);
            deleteFirearm(firearm.id);
            showToast('success', 'Firearm Deleted');
        }
    }
    const handleFirearmOnSelect = (firearm) => {
        selectFirearm(firearms, firearm.id);
    }
    const handleFirearmOnSubmit = (firearm) => {
        if (firearm.id === 'Add') {
            if (!firearms.find((f) => f.name === firearm.name)) {
                insertFirearm(firearm);
                selectFirearm(firearms, firearm.id);
                showToast('success', 'Round Added');
            }
        } else {
            updateFirearm(firearm);
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
    const handleRoundOnAdd = () => {
        selectRound(firearms, firearmId, 'Add');
    }
    const handleRoundOnClose = () => {
        selectRound(null, null, null);
    }
    const handleRoundOnDelete = (round) => {
        if (window.confirm(`Are you sure you want to delete "${round.name}"?`)) {
            if (roundId === round.id) {
                selectRound(firearms, firearmId, null);
            }
            deleteRound(firearmId, round.id);
            showToast('success', 'Round Deleted');
        }
    }
    const handleRoundOnSelect = (round) => {
        selectRound(firearms, firearmId, round.id);
    }
    const handleRoundOnSubmit = (round) => {
        if (round.id === 'Add') {
            insertRound(firearmId, round);
            selectRound(firearms, firearmId, round.id);
            showToast('success', 'Firearm Added');
        } else {
            updateRound(firearmId, round);
            selectRound(firearms, firearmId, round.id);
            showToast('success', 'Round Updated');
        }
    }
    const handleTargetOnSubmit = (targetData) => {
        updateTarget({
            chartStepping: Number(targetData.chartStepping),
            distance: Number(targetData.distance),
            distanceUnits: targetData.distanceUnits,
            sizeInches: Number(targetData.sizeInches),
            sizeMils: null,
            slantDegrees: Number(targetData.slantDegrees),
            speedMph: Number(targetData.speedMph)
        });
        showToast('success', 'Target Data Saved');
    }
    const handleWeatherOnSubmit = (weatherData) => {
        updateWeather(weatherData);
        showToast('success', 'Weather Data Saved');
    }

    // Get data
    let firearm = getFirearm(firearms, firearmId);
    let round = getRound(firearm, roundId);
    const rangeData = useMemo(() => ballistics.getRangeData(weather, target, firearm, round), [weather, target, firearm, round]);

    // Render UI
    return (
        <div className={`container-fluid ${css.app}`}>
            <div>
                <label className="btn btn-info" onChange={(event) => handleDataImport(event)}>
                    Import <input type="file" multiple={false} accept=".json" hidden />
                </label>
                &nbsp;
                <label className="btn btn-info" onClick={() => handleDataExport()}>Export</label>
                &nbsp;
                <button className="theme-toggle-btn" onClick={toggleTheme}>
                    <i className={theme === 'dark' ? 'fa fa-sun-o' : 'fa fa-moon-o'}></i>
                </button>
            </div>
            <div className="d-flex flex-row flex-wrap justify-content-center">
                <Weather weatherData={weather} onSubmit={(weatherData) => handleWeatherOnSubmit(weatherData)} />
                <Target targetData={target} onSubmit={(targetData) => handleTargetOnSubmit(targetData)} />
                {firearmId === null ?
                    <Firearms firearms={firearms} onAdd={() => handleFirearmOnAdd()} onSelect={(firearm) => handleFirearmOnSelect(firearm)} />
                    :
                    <React.Fragment>
                        <Firearm firearm={firearm} onClose={() => handleFirearmOnClose()} onDelete={(firearm) => handleFirearmOnDelete(firearm)} onSubmit={(firearm) => handleFirearmOnSubmit(firearm)}/>
                        {firearmId !== 'Add' ? round == null ?
                            <Rounds rounds={firearm.rounds} onAdd={() => handleRoundOnAdd()} onSelect={(round) => handleRoundOnSelect(round)} />
                            :
                            <Round round={round} onClose={() => handleRoundOnClose()} onDelete={(round) => handleRoundOnDelete(round)} onSubmit={(round) => handleRoundOnSubmit(round)} />
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
