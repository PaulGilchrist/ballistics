import { createSlice } from '@reduxjs/toolkit';

import utilities from 'pg-utilities'
import FIREARMS from './data/firearms';

// Get initialState
let initialfirearms = null;
const firearmsJson = localStorage.getItem('firearms');
if(firearmsJson) {
    initialfirearms = utilities.jsonParseNumbers(firearmsJson);
} else {
    initialfirearms = FIREARMS;
    localStorage.setItem('firearms', JSON.stringify(initialfirearms));
}
let initialTarget = null;
const targetJson = localStorage.getItem('target');
if(targetJson) {
    initialTarget = utilities.jsonParseNumbers(targetJson);
} else {
    initialTarget = {
        distanceUnits: 'Yards', // Yards or Meters
        distance: 1000,
        chartStepping: 50,
        sizeInches: 40,
        sizeMils: null,
        slantDegrees: 45,
        speedMPH: 3
    };
    localStorage.setItem('target', JSON.stringify(initialTarget));
}
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

export const appSlice = createSlice({
  name: 'app',
  initialState: {
    firearmId: localStorage.getItem('firearmId'), // GUID or null (none) or Blank (add)
    firearms: initialfirearms,
    roundId: localStorage.getItem('roundId'), // GUID or null (none) or Blank (add)
    target: initialTarget,
    weather: initialWeather
  },
  reducers: {
    // Redux Toolkit allows us to write "mutating" logic in reducers. It
    // doesn't actually mutate the state because it uses the Immer library,
    // which detects changes to a "draft state" and produces a brand new
    // immutable state based off those changes
    deleteFirearm: (state, action) => {
        // action must pass firearmId
        let firearmId = action.payload;
        const firearmIndex = state.firearms.findIndex((f) => f.id===firearmId);
        if(firearmIndex !== -1) {                    
            state.firearms = state.firearms.splice(firearmIndex, 1);
            localStorage.setItem('firearms', JSON.stringify(state.firearms));
        }
    },
    deleteRound: (state, action) => {
        // action must pass firearmId and roundId
        let firearmId = action.payload.firearmId;
        let roundId = action.payload.roundId;
        const firearmIndex = state.firearms.findIndex((f) => f.id===firearmId);
        if(firearmIndex !== -1) {
            const roundIndex = state.firearms[firearmIndex].rounds.findIndex((r) => r.id===roundId);
            if(roundIndex !== -1) {
                state.firearms[firearmIndex].rounds.splice(roundIndex, 1);
                localStorage.setItem('firearms', JSON.stringify(state.firearms));
            }
        }
    },
    getWeather: (state) => {
        const weatherJson = localStorage.getItem('weather');
        if(weatherJson) {
            state.weather = utilities.jsonParseNumbers(weatherJson);
        } else {
            state.weather = {
                altitudeFeet: 0,
                temperatureDegreesFahrenheit: 59,
                barometricPressureInchesHg: 29.53,
                relativeHumidityPercent: 78,
                windVelocityMPH: 10,
                windAngleDegrees: 90
            };
            localStorage.setItem('weather', JSON.stringify(state.weather));
        }
    },
    insertFirearm: (state, action) => {
        // action must pass firearm
        let firearm = action.payload;
        if(firearm.id==='Add') {
            // Make sure it does not already exist
            let firearmIndex = state.firearms.findIndex((f) => f.name===firearm.name);
            if(firearmIndex === -1) {
                firearm.id = utilities.guid();
                state.firearms.push(firearm);
                state.firearms.sort(utilities.nameSort);
                localStorage.setItem('firearms', JSON.stringify(state.firearms));
            }
        }
    },
    insertRound: (state, action) => {
        // action must pass firearmId and round
        let firearmId = action.payload.firearmId;
        let round = action.payload.round;
        const firearmIndex = state.firearms.findIndex((f) => f.id===firearmId);
        if(firearmIndex !== -1) {
            if(round.id==='Add') {
                // Make sure it does not already exist
                let roundIndex = state.firearms[firearmIndex].rounds.findIndex((r) => r.name===round.name);
                if(roundIndex === -1) {
                    round.id = utilities.guid();
                    state.firearms[firearmIndex].rounds.push(round);
                    state.firearms[firearmIndex].rounds.sort(utilities.nameSort);
                    localStorage.setItem('firearms', JSON.stringify(state.firearms));
                }
            }
        }
    },
    selectFirearm: (state, action) => {
        // action must pass firearmId
        const firearmId = action.payload;
        state.firearmId = null;
        localStorage.removeItem('firearmId');
        if(firearmId != null) {
            const firearmIndex = state.firearms.findIndex((f) => f.id===firearmId);
            if(firearmIndex !== -1 || firearmId === 'Add') {
                state.firearmId = firearmId;
                localStorage.setItem('firearmId', firearmId);                    
            }
        }
    },
    selectRound: (state, action) => {
        // action must pass roundId.  firearmId must already have been selected
        const roundId = action.payload;
        state.roundId = null;
        localStorage.removeItem('roundId');
        if(roundId != null) {
            const firearmIndex = state.firearms.findIndex((f) => f.id===state.firearmId);
            if(firearmIndex !== -1) {
                const roundIndex = state.firearms[firearmIndex].rounds.findIndex((r) => r.id===roundId);
                if(roundIndex !== -1 || roundId === 'Add') {
                    state.roundId = roundId;
                    localStorage.setItem('roundId', roundId);                    
                }
            }
        }
    },
    updateFirearm: (state, action) => {
        // action must pass firearm
        let firearm = action.payload;
        const firearmIndex = state.firearms.findIndex((f) => f.id===firearm.id);
        if(firearmIndex !== -1) {
            state.firearms[firearmIndex] = firearm;
            localStorage.setItem('firearms', JSON.stringify(state.firearms));
        }
    },
    updateFirearms: (state, action) => {
        // action must pass firearms
        state.firearms = action.payload;
        localStorage.setItem('firearms', JSON.stringify(state.firearms));
    },
    updateRound: (state, action) => {
        // action must pass firearmId and round
        let firearmId = action.payload.firearmId;
        let round = action.payload.round;
        const firearmIndex = state.firearms.findIndex((f) => f.id===firearmId);
        if(firearmIndex !== -1) {
            let roundIndex = state.firearms[firearmIndex].rounds.findIndex((r) => r.name===round.name);
            if(roundIndex === -1) {
                state.firearms[firearmIndex].rounds[roundIndex] = round;
                localStorage.setItem('firearms', JSON.stringify(state.firearms));
            }
        }
    },
    // case 'UPDATE_ROUND': {
    //     // action must pass firearmId and round
    //     return state;
    // }
    updateTarget: (state, action) => {
        // action must pass target object
        state.target = action.payload;
        localStorage.setItem('target', JSON.stringify(state.target));
    },
    updateWeather: (state, action) => {
        // action must pass weather object
        state.weather = action.payload;
        localStorage.setItem('weather', JSON.stringify(state.weather));
    }
  }
});

export const {
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
    updateWeather
 } = appSlice.actions;

// The function below is called a thunk and allows us to perform async logic. It
// can be dispatched like a regular action: `dispatch(incrementAsync(10))`. This
// will call the thunk with the `dispatch` function as the first argument. Async
// code can then be executed and other actions can be dispatched
// export const incrementAsync = amount => dispatch => {
//   setTimeout(() => {
//     dispatch(incrementByAmount(amount));
//   }, 1000);
// };

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state) => state.counter.value)`
export const selectorFirearmId = state => state.app.firearmId;
export const selectorFirearms = state => state.app.firearms;
export const selectorRoundId = state => state.app.roundId;
export const selectorTarget = state => state.app.target;
export const selectorWeather = state => state.app.weather;

export default appSlice.reducer;
