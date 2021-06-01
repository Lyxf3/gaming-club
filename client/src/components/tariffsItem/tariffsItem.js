import React from "react";

import titles from "../../modules/titles.module.css";
import tariff from './tariffsItem.module.css'

export const TariffsItem = ({header, pcSettings, periphery, timeAndCost, onToggleActive, activeId, id}) => {

    const pcSettingsShow = pcSettings.map((item, index) => {
        return (
            <li key={index} className={tariff.data}>
                <div className={tariff.dot}>
                </div>
                <div className={tariff.text}>
                    {item}
                </div>
            </li>
        )
    })

    const peripheryShow = periphery.map((item, index) => {
        return (
            <li key={index} className={tariff.data}>
                <div className={tariff.dot}>
                </div>
                <div className={tariff.text}>
                    {item}
                </div>
            </li>
        )
    })

    const timeAndCostShow = timeAndCost.map((item, index) => {
        const {time, cost} = item
        return (
            <div key={index} className={tariff.timeAndCost}>
                <div className={tariff.time}>{time}</div>
                <div className={tariff.cost}><span>{cost}</span> ГРН ЧАС</div>
            </div>
        )
    })
    const borderActive = (activeId === id ? { border: "3px solid #E8505B"} : {})
    const lineActive = (activeId === id ? { background: "#E8505B"} : {})

    return (
        <div className={tariff.tariff_item}>
            <h2 className={titles.tariff_title}>{header}</h2>
            <div className={tariff.tariff_container} onClick={onToggleActive} style={borderActive}>
                <ul className={tariff.pcSettings}>
                    {pcSettingsShow}
                </ul>
                <ul className={tariff.periphery}>
                    {peripheryShow}
                </ul>
                <div className={tariff.line} style={lineActive}> </div>
                <div className={tariff.tariffs}>{timeAndCostShow}</div>
            </div>
        </div>
    )
}