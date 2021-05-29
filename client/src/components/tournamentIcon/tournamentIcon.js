import React from "react";

import tour from "./tounamentIcon.module.css";
import titles from "../../modules/titles.module.css";

export const TournamentIcon = (props) => {
    const {game, header, date, place, prize} = props
    return (
    <div className={tour.container}>
        <img src={game} alt={game} className={tour.game_icon}/>
        <h2 className={titles.title}>{header}</h2>
        <div className={tour.date}>Дата: {date}</div>
        <div className={tour.place}>Места: {place}</div>
        <div className={tour.prize}>Призовой: {prize}</div>
    </div>
    )
}