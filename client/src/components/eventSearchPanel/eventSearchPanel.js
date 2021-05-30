import React, { useState} from 'react';


export const EventSearchPanel = () => {
    const [state, setState] = useState( "")
    const onUpdateSearch = e => {
        setState(e.target.value)
    }
    return (
        <input
            className="form-control search-input"
            type="text"
            placeholder="Поиск по записям"
            value={state}
            onChange={onUpdateSearch}
        />
    )
}