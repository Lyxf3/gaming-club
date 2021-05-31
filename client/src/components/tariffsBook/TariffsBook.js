import React from "react";

import topUp from './topUp.module.css'
import titles from "../../modules/titles.module.css";

export const TariffsBook = ({pcs, header, activePrice, setPCHandler}) => {


    const pcsList = pcs.map((item, index) => {
        const {status} = item
        const text = status ? "Свободно" : "Занято"
        const styles = status ? {color: "#14B1AB"} : {color: "#E8505B"}
        const backStyles = status ? {background: "#3F3F3F", cursor: "pointer"} : {background: "#535353"}
        return (
            <li className={topUp.item} key={index} style={backStyles} onClick={() => setPCHandler(index)}>
                <div>
                    {index+1}
                </div>
                <div style={styles}>
                    {text}
                </div>

            </li>
        )
    })
    return (
        <div className={topUp.container}>
            <h2 className={titles.title}>Забронировать копьютер</h2>
            <h3 className={titles.tariff_title}>{header}</h3>
            <div className={topUp.tableHeader}>
                <div className={topUp.pcNumber}>Номер ПК</div>
                <div className={topUp.status}>Статус</div>
            </div>
            <ul>{pcsList}</ul>
        </div>
    )
}