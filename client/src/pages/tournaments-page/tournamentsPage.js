import React from 'react'

import {TournamentIcon} from "../../components/tournamentIcon/tournamentIcon";
import dota from '../../details/icons/game-disciplines/dota-icon.png'
import r6 from '../../details/icons/game-disciplines/r6-icon.png'
import csgo from '../../details/icons/game-disciplines/csgo-icon.png'
import valorant from '../../details/icons/game-disciplines/valorant-icon.png'

import './tournamentsPage.css'

export const TournamentsPage = () => {
    const data = [
        {game:dota, header:"ZP Fast CUP 5 vs 5", startDate:"25.10.20", endDate:"26.10.20", place:"30/64", prize:"₴1500"},
        {game:dota, header:"ZP Fast CUP 5 vs 5", startDate:"25.10.20", endDate:"26.10.20", place:"30/64", prize:"₴1500"},
        {game:dota, header:"ZP Fast CUP 5 vs 5", startDate:"25.10.20", endDate:"26.10.20", place:"30/64", prize:"₴1500"},
        {game:dota, header:"ZP Fast CUP 5 vs 5", startDate:"25.10.20", endDate:"26.10.20", place:"30/64", prize:"₴1500"},
        {game:dota, header:"ZP Fast CUP 5 vs 5", startDate:"25.10.20", endDate:"26.10.20", place:"30/64", prize:"₴1500"},
        {game:dota, header:"ZP Fast CUP 5 vs 5", startDate:"25.10.20", endDate:"26.10.20", place:"30/64", prize:"₴1500"},
        {game:dota, header:"ZP Fast CUP 5 vs 5", startDate:"25.10.20", endDate:"26.10.20", place:"30/64", prize:"₴1500"}
    ]
    const tournaments = data.map((item) => {
        const {header, ...itemProps} = item;
        return (
            <TournamentIcon key={header}
                header={header}
                {...itemProps}
            />
        )
    })
    return (
        <div className="content">
            <div className="events">
                {tournaments}
            </div>
        </div>
    )
}