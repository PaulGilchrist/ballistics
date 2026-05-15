import { useState } from 'react';
import utilities from '../utils/utilities';
import FIREARMS from '../data/firearms';

export default function useFirearms() {
    const [firearms, setFirearms] = useState(() => {
        const firearmsJson = localStorage.getItem('firearms');
        if (firearmsJson) {
            return utilities.jsonParseNumbers(firearmsJson);
        }
        localStorage.setItem('firearms', JSON.stringify(FIREARMS));
        return FIREARMS;
    });

    const updateFirearms = (newFirearms) => {
        setFirearms(newFirearms);
        localStorage.setItem('firearms', JSON.stringify(newFirearms));
    };

    const deleteFirearm = (firearmId) => {
        const filtered = firearms.filter(f => f.id !== firearmId);
        if (filtered.length !== firearms.length) {
            updateFirearms(filtered);
        }
    };

    const deleteRound = (firearmId, roundId) => {
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
    };

    const insertFirearm = (firearm) => {
        if (firearm.id === 'Add') {
            if (!firearms.find((f) => f.name === firearm.name)) {
                const newFirearm = { ...firearm, id: utilities.guid(), rounds: [] };
                const sortedFirearms = [...firearms, newFirearm].sort((a, b) => a.name.localeCompare(b.name));
                updateFirearms(sortedFirearms);
            }
        }
    };

    const insertRound = (firearmId, round) => {
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
    };

    const updateFirearm = (firearm) => {
        const existingFirearm = firearms.find(f => f.id === firearm.id);
        if (existingFirearm) {
            const updatedFirearm = { ...firearm, rounds: existingFirearm.rounds };
            const newFirearms = firearms.map(f => f.id === firearm.id ? updatedFirearm : f);
            updateFirearms(newFirearms);
        }
    };

    const updateRound = (firearmId, round) => {
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
    };

    return { firearms, updateFirearms, deleteFirearm, deleteRound, insertFirearm, insertRound, updateFirearm, updateRound };
}
