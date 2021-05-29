import React from "react";

import tour from "./tounamentIcon.module.css";
import titles from "../../modules/titles.module.css";

export const TournamentIcon = (props) => {
    const {game, header, startDate, endDate, place, prize} = props
    const currentDate = new Date()
    const start = startDate.split(".").map(e => +e)
    console.log(startDate)
    console.log([currentDate])
    const checkDateColor = () => {
        if(startDate) {
            return ""
        } else if(startDate) {
            return ""
        }
        return ""
    }
    const checkPlaceColor = () => {
        const places = place.split("/").map(e => +e)
        const number = Math.round(places[1]/3)
        if(+places[0] < places[1]-number*2) {
            return "#14B1AB"
        } else if(+places[0] < places[1]-number) {
            return "#D2780F"
        }
        return "#E8505B"
    }

    return (
    <div className={tour.container}>
        <img src={game} alt={game} className={tour.game_icon}/>
        <h2 className={titles.tournamentTitle}>{header}</h2>
        <div className={tour.date}>Дата: <span style={{color: checkDateColor()}}>{startDate} / {endDate}</span></div>
        <div className={tour.place}>Места: <span style={{color: checkPlaceColor()}}>{place}</span></div>
        <div className={tour.prize}>Призовой: <span>{prize}</span></div>
    </div>
    )
}