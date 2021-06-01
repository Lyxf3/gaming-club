import React, {useMemo} from "react";

import tour from "./tounamentIcon.module.css";
import titles from "../../modules/titles.module.css";

export const TournamentIcon = (props) => {
    const {game, header, startDate, endDate, maxPlace, teams, prize, onToggleImportant, important, onToggleActive, activeId, id} = props
const currentPlace = teams.length

    const checkDateColor = () => {
        const date = new Date();
        const currentDate = Date.parse(date.getFullYear(), date.getMonth(), date.getDate())
        const startNormDate = startDate.split(".").map((e, index) => index === 2 ? +(20 + e) : +e).reverse()
        const endNormDate = endDate.split(".").map((e, index) => index === 2 ? +(20 + e) : +e).reverse()
        const parseStartNormDate = Date.parse(...startNormDate)
        const parseEndNormDate = Date.parse(...endNormDate)
        if(parseStartNormDate > currentDate) {
            return "#14B1AB"
        } else if(parseEndNormDate > currentDate) {
            return "#D2780F"
        }
        return "#E8505B"
    }

    const checkPlaceColor = () => {
        const number = Math.round(maxPlace/3)
        if(currentPlace < maxPlace-number*2) {
            return "#14B1AB"
        } else if(currentPlace < maxPlace-number) {
            return "#D2780F"
        }
        return "#E8505B"
    }

    const styleImportant = useMemo(() => ({fill: important ? "#F9D56E" : "#E0E0E0"}), [important])
    const styleActive = useMemo(() => (activeId === id ? { border: "3px solid #E8505B"} : {}), [activeId, id])

    return (
    <div className={tour.container} style={styleActive}>
        <svg
            className={tour.important}
            onClick={onToggleImportant}
            width="36" height="36"
            viewBox="0 0 24 24"
            style={styleImportant}>
            <path d="M 6.0097656 2 C 4.9143111 2 4.0097656 2.9025988 4.0097656 3.9980469 L 4 22 L 12 19 L 20 22 L 20 20.556641 L 20 4 C 20 2.9069372 19.093063 2 18 2 L 6.0097656 2 z M 6.0097656 4 L 18 4 L 18 19.113281 L 12 16.863281 L 6.0019531 19.113281 L 6.0097656 4 z"/>
        </svg>
        <div className={tour.content} onClick={onToggleActive}>
            <img src={game} alt={game} className={tour.game_icon}/>
            <h2 className={titles.tournamentTitle}>{header}</h2>
            <div className={tour.date}>Дата: <span style={{color: checkDateColor()}}>{startDate} / {endDate}</span></div>
            <div className={tour.place}>Места: <span style={{color: checkPlaceColor()}}>{currentPlace} / {maxPlace}</span></div>
            <div className={tour.prize}>Призовой: <span>{prize}</span></div>
        </div>

    </div>
    )
}