import React, { useState} from 'react';
import {SearchInput} from "../authPageItems";

export const EventSearchPanel = (props) => {
    const {onUpdateSearch} = props
    const [state, setState] = useState( "")

    const updateSearchHandler = e => {
        const term = e.target.value;
        setState(term);
        onUpdateSearch(term);
    }

    return (
        <SearchInput
            changeHandler={updateSearchHandler}
            value={state}
            placeholder={"Поиск по названию"}
        />
    )
}