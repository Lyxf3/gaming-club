import React from "react";

import titles from "../../modules/titles.module.css";
import tour from "../tournamentIcon/tounamentIcon.module.css";

export const EventsAdditionalInformation = ({header, teams, startDate, endDate, maxPlace, prize, location, tournamentSystem, registerLink, regulationsLink, game}) => {

    const currentPlace = teams.length

    const showTeams = teams.map((e, i) => {
        return (
            <>
                <li key={i} className={tour.team} >{i+1}. {e}</li>
            </>
        )
    })
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

    return (
        <div className={tour.additional_info}>
            <h2 className={titles.title}>{header}</h2>
            <div className={tour.information}>
                <h3 className={titles.info_title}>Информиция</h3>
                <img src={game} alt={game} className={tour.game_icon}/>
                <div className={tour.date}>Дата: <span style={{color: checkDateColor()}}>{startDate} / {endDate}</span></div>
                <div className={tour.place}>Места: <span style={{color: checkPlaceColor()}}>{currentPlace} / {maxPlace}</span></div>
                <div className={tour.prize}>Призовой: <span>{prize}</span></div>
                <div className={tour.location}>Локация: <span>{location}</span></div>
                <div className={tour.tournamentSystem}>Система: <span>{tournamentSystem}</span></div>
                <a href={regulationsLink} className={tour.regulationLink}>Регламент</a>
                <a href={registerLink} className={tour.regBtn}>Регистрация!</a>
            </div>
            <div className={tour.teams}>
                <h3 className={titles.info_title}>Команды {currentPlace} / {maxPlace}</h3>
                <ul id="style-2">
                    {showTeams}
                </ul>
            </div>
        </div>
    )
}