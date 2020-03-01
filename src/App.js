import React, {useState} from 'react';
import {toast}  from 'react-toastify' // Must be initialized in App.js (see https://github.com/fkhadra/react-toastify#usage)
import 'react-toastify/dist/ReactToastify.min.css';

import 'animate.css/animate.min.css';
import 'bootstrap/dist/css//bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css';
import 'react-toastify/dist/ReactToastify.min.css';
import css from './app.module.css';

import Firearm from './components/Firearm';
import Firearms from './components/Firearms';
import Target from './components/Target';
import Weather from './components/Weather';

import FIREARMS from './data/firearms';


const App = () => {
    // Call it once in your app. At the root of your app is the best place
    toast.configure();
    // Get global data
    const [firearmId, setFirearmId] = useState(localStorage.getItem('firearmId')); // GUID or null (none) or Blank (add)
    let firearms;
    const firearmsJson = localStorage.getItem('firearms');
    if(firearmsJson) {
       firearms = JSON.parse(firearmsJson);
    } else {
        firearms = FIREARMS;
        localStorage.setItem('firearms', JSON.stringify(firearms));
    }
    let target;
    const targetJson = localStorage.getItem('target');
    if(targetJson) {
       target = JSON.parse(targetJson);
    } else {
        target = {
            distanceUnits: 0, // 0=Yards, 1=Meters
            distance: 1000,
            chartStepping: 50,
            sizeInches: 40,
            sizeMils: '',
            slantDegrees: 45,
            speedMPH: 3
        }
        localStorage.setItem('target', JSON.stringify(target));
    }
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
    const getFirearm = () => {
        if(firearmId===null) {
            return null;
        } else if(firearmId==='Add') {
            return {
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
            return firearms.find((f) => f.id===firearmId);
        }
    }


    const handleOnAddFirearm = () => {
        setFirearmId('Add');
        localStorage.setItem('firearmId', 'Add');
    }
    const handleOnSelectFirearm = (firearm) => {
        setFirearmId(firearm.id);
        localStorage.setItem('firearmId', firearm.id);
    }
    const handleOnSubmitFirearm = (firearm) => {
        console.log(firearm);
    }
    const handleOnSubmitTarget = (values) => {
        // Don't save sizeMils
        values.sizeMils = null;
        localStorage.setItem('target', JSON.stringify(values));
        toast.success('Target Data Saved', {
            distance: "top-center",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true
        });
    }
    const handleOnSubmitWeather = (values) => {
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
    console.log(firearmId);
    return (
        <div className={`container-fluid ${css.app}`}>
            <div className="d-flex flex-row flex-wrap justify-content-center">
                <Weather values={weather} onSubmit={(values) => handleOnSubmitWeather(values)}/>
                <Target values={target} onSubmit={(values) => handleOnSubmitTarget(values)}/>
                {firearmId===null ? 
                    <Firearms firearms={firearms} onAddFirearm={() => handleOnAddFirearm()} onSelectFirearm={(firearm) => handleOnSelectFirearm(firearm)}/>
                    : <Firearm firearm={getFirearm()} onSubmit={(firearm) => handleOnSubmitFirearm(firearm)}/>
                }
            </div>
        </div>
    );
}
export default App;
