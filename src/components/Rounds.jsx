import React from 'react';
import ItemList from './ItemList';

const Rounds = ({rounds, onAdd, onSelect}) => {
    return (
        <ItemList
            items={rounds}
            onAdd={onAdd}
            onSelect={onSelect}
            title="Select Round"
            addItemLabel="Add Round"
        />
    );
}

export default Rounds;
