import React, {useState} from 'react';
import {toast}  from 'react-toastify' // Must be initialized in App.js (see https://github.com/fkhadra/react-toastify#usage)
import 'react-toastify/dist/ReactToastify.min.css';

import 'animate.css/animate.min.css';
import 'bootstrap/dist/css//bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css';
import 'react-toastify/dist/ReactToastify.min.css';
import css from './app.module.css';

import Chart from './components/Chart';
import Firearm from './components/Firearm';
import Firearms from './components/Firearms';
import Round from './components/Round';
import Rounds from './components/Rounds';
import Target from './components/Target';
import Weather from './components/Weather';
import tools from './utilities/tools'

import FIREARMS from './data/firearms';


const App = () => {
    // Call it once in your app. At the root of your app is the best place
    toast.configure();
    // Get watched data
    const [firearmId, setFirearmId] = useState(localStorage.getItem('firearmId')); // GUID or null (none) or Blank (add)
    const [roundId, setRoundId] = useState(localStorage.getItem('roundId')); // GUID or null (none) or Blank (add)
    // Get unwatched data
    let firearms;
    const firearmsJson = localStorage.getItem('firearms');
    if(firearmsJson) {
       firearms = JSON.parse(firearmsJson);
    } else {
        firearms = FIREARMS;
        localStorage.setItem('firearms', JSON.stringify(firearms));
    }
    // Get firearm from firearms array using firearmId
    let firearm = null;
    if(firearmId==='Add') {
        firearm = {
            id: 'Add',
            name: '',
            elevationTurretGradients: 10,
            reticleUnits: 'Mil',
            rounds: [],
            sightHeightInches: '2.0',
            turretUnits: 'Mil',
            windageTurretGradients: '10',
            zeroRangeUnits: 'Yards',
            zeroRange: '100'
        }
    } else {
        firearm = firearms.find((f) => f.id===firearmId);
    }
    // Get round from firearm.rounds array using roundId
    let round = null;
    if(firearm) {
        if(roundId==='Add') {
            round = {
                id: 'Add',
                name: '',
                bulletDiameterInches: '',
                bulletWeightGrains: '',
                muzzleVelocityFPS: ''
            }
        } else if(firearm.rounds && firearm.rounds.length>0) {
            round = firearm.rounds.find((r) => r.id===roundId);
        }
    }
    // Get target
    let target;
    const targetJson = localStorage.getItem('target');
    if(targetJson) {
       target = JSON.parse(targetJson);
    } else {
        target = {
            distanceUnits: 'Yards', // Yards or Meters
            distance: 1000,
            chartStepping: 50,
            sizeInches: 40,
            sizeMils: '',
            slantDegrees: 45,
            speedMPH: 3
        }
        localStorage.setItem('target', JSON.stringify(target));
    }
    // Get weather
    let weather
    const weatherJson = localStorage.getItem('weather');
    if(weatherJson) {
       weather = JSON.parse(weatherJson);
    } else {
        weather = {
            altitudeFeet: 0,
            temperatureDegreesFahrenheit: 59,
            barometricPressureInchesHg: 29.53,
            relativeHumidityPercent: 78,
            windVelocityMPH: 10,
            windAngleDegrees: 90
        }
        localStorage.setItem('weather', JSON.stringify(weather));
    }
    // Event Handlers
    const handleFirearmOnAdd = () => {
        setFirearmId('Add');
        localStorage.setItem('firearmId', 'Add');
    }
    const handleFirearmOnClose = () => {
        setFirearmId(null);
        localStorage.removeItem('firearmId');
    }
    const handleFirearmOnDelete = (firearm) => {
        ////////////////////////////////////////////////////////////////////////////////
        /////////////////////////// NEED CONFIRMATION DIALOG ///////////////////////////
        ////////////////////////////////////////////////////////////////////////////////
        const firearmIndex = firearms.findIndex((f) => f.id===firearm.id);
        firearms.splice(firearmIndex, 1);
        localStorage.setItem('firearms', JSON.stringify(firearms));
        localStorage.removeItem('firearmId');
        setFirearmId(null);
        toast.success(`Firearm Deleted`, {
            distance: "top-center",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true
        });
    }
    const handleFirearmOnSelect = (firearm) => {
        setFirearmId(firearm.id);
        localStorage.setItem('firearmId', firearm.id);
    }
    const handleFirearmOnSubmit = (firearm) => {
        // Find by name rather than id to ensure the name remains unique
        let firearmIndex = firearms.findIndex((f) => f.name===firearm.name);
        if(firearm.id==='Add') {
            // Add new firearm if name does not already exist
            if(firearmIndex === -1) {
                firearm.id = tools.guid();
                firearms.push(firearm);
                firearms.sort(tools.nameSort);
                localStorage.setItem('firearms', JSON.stringify(firearms));
                setFirearmId(null);
                toast.success(`Firearm Added`, {
                    distance: "top-center",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true
                });
            } else {
                toast.error(`Name already exists - Firearm not added`, {
                    distance: "top-center",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true
                });
            }
        } else {
            // If not adding new firearm, find it in firearms array
            // If firearm name found then the id must also match
            if(firearmIndex!==-1 && firearms[firearmIndex].id!==firearm.id) {
                toast.error(`Name already exists - Firearm not updated`, {
                    distance: "top-center",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true
                });
            } else {
                // If name not found, we must find the id which should always exist since it was used to launch the component to begin with
                if(firearmIndex===-1) {
                    firearmIndex = firearms.findIndex((f) => f.id===firearm.id);
                }
                firearms[firearmIndex] = firearm
                firearms.sort(tools.nameSort); // In case the name changed
                localStorage.setItem('firearms', JSON.stringify(firearms));
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
    }
    const handleRoundOnAdd = () => {
        setRoundId('Add');
        localStorage.setItem('roundId', 'Add');
    }
    const handleRoundOnClose = () => {
        setRoundId(null);
        localStorage.removeItem('roundId');
    }
    const handleRoundOnDelete = (round) => {
        ////////////////////////////////////////////////////////////////////////////////
        /////////////////////////// NEED CONFIRMATION DIALOG ///////////////////////////
        ////////////////////////////////////////////////////////////////////////////////
        const roundIndex = firearm.rounds.findIndex((r) => r.id===round.id);
        firearm.rounds.splice(roundIndex, 1);
        localStorage.setItem('firearms', JSON.stringify(firearms));
        localStorage.removeItem('roundId');
        setRoundId(null);
        toast.success(`Round Deleted`, {
            distance: "top-center",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true
        });
    }
    const handleRoundOnSelect = (round) => {
        setRoundId(round.id);
        localStorage.setItem('roundId', round.id);
    }
    const handleRoundOnSubmit = (round) => {
        // Find by name rather than id to ensure the name remains unique
        let roundIndex = firearm.rounds.findIndex((r) => r.name===round.name);
        if(round.id==='Add') {
            // Add new round if name does not already exist
            if(roundIndex === -1) {
                round.id = tools.guid();
                firearm.rounds.push(round);
                firearm.rounds.sort(tools.nameSort);
                localStorage.setItem('firearms', JSON.stringify(firearms));
                setRoundId(null);
                toast.success(`Round Added`, {
                    distance: "top-center",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true
                });
            } else {
                toast.error(`Name already exists - Round not added`, {
                    distance: "top-center",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true
                });
            }
        } else {
            // If not adding new firearm, find it in firearms array
            // If round name found then the id must also match
            if(roundIndex!==-1 && firearm.rounds[roundIndex].id!==round.id) {
                toast.error(`Name already exists - Round not updated`, {
                    distance: "top-center",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true
                });
            } else {
                // If name not found, we must find the id which should always exist since it was used to launch the component to begin with
                if(roundIndex===-1) {
                    roundIndex = firearm.rounds.findIndex((r) => r.id===round.id);
                }
                firearm.rounds[roundIndex] = round
                firearm.rounds.sort(tools.nameSort); // In case the name changed
                localStorage.setItem('firearms', JSON.stringify(firearms));
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
        localStorage.setItem('target', JSON.stringify(values));
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
        localStorage.setItem('weather', JSON.stringify(values));
        toast.success('Weather Data Saved', {
            position: "top-center",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true
        });
    }
    // Render UI
    return (
        <div className={`container-fluid ${css.app}`}>
            <div className="d-flex flex-row flex-wrap justify-content-center">
                <Weather values={weather} onSubmit={(values) => handleWeatherOnSubmit(values)}/>
                <Target values={target} onSubmit={(values) => handleTargetOnSubmit(values)}/>
                {firearmId===null ?
                    <Firearms firearms={firearms} onAdd={() => handleFirearmOnAdd()} onSelect={(firearm) => handleFirearmOnSelect(firearm)}/>
                    :
                    <React.Fragment>
                        <Firearm firearm={firearm} onClose={() => handleFirearmOnClose()} onDelete={(firearm) => handleFirearmOnDelete(firearm)} onSubmit={(firearm) => handleFirearmOnSubmit(firearm)}/>
                        {roundId===null ?
                            <Rounds rounds={firearm.rounds} onAdd={() => handleRoundOnAdd()} onSelect={(round) => handleRoundOnSelect(round)}/>
                            :
                            <Round round={round} onClose={() => handleRoundOnClose()} onDelete={(round) => handleRoundOnDelete(round)} onSubmit={(round) => handleRoundOnSubmit(round)}/>
                        }
                    </React.Fragment>
                }
                {firearmId && roundId ?
                    <Chart firearm={firearm} round={round} target={target} weather={weather}/>
                    : null
                }
            </div>
        </div>
    );
}
export default App;
