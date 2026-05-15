import { useState } from 'react';

export default function useSelection() {
    const [firearmId, setFirearmId] = useState(localStorage.getItem('firearmId'));
    const [roundId, setRoundId] = useState(localStorage.getItem('roundId'));

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
    };

    const selectRound = (firearms, firearmId, roundId) => {
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
    };

    return { firearmId, roundId, selectFirearm, selectRound };
}
