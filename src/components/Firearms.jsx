import React from 'react';
import ItemList from './ItemList';

const Firearms = ({firearms, onAdd, onSelect}) => {
    return (
        <ItemList
            items={firearms}
            onAdd={onAdd}
            onSelect={onSelect}
            title="Select Firearm"
            addItemLabel="Add Firearm"
        />
    );
}

export default Firearms;
