import React from "react";
import {TariffsItem} from "../tariffsItem/tariffsItem";

import './tariffsList.css'

export const TariffsList = ({data, activeId, onToggleActive}) => {

    const listOfItems = data.map(item => {
        const {id, ...itemProps} = item
        return (
            <TariffsItem key={id}
                         id={id}
                         {...itemProps}
                         onToggleActive={() => onToggleActive(id)}
                         activeId={activeId}
            />
        )
    })
    return (
        <ul className="tariffs_list">
            {listOfItems}
        </ul>
    )
}