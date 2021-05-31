import React, {useEffect, useState} from 'react'

import dota from '../../details/icons/game-disciplines/dota-icon.png'
import r6 from '../../details/icons/game-disciplines/r6-icon.png'
import csgo from '../../details/icons/game-disciplines/csgo-icon.png'
import valorant from '../../details/icons/game-disciplines/valorant-icon.png'

import './tournamentsPage.css'
import {EventSearchPanel} from "../../components/eventSearchPanel/eventSearchPanel";
import {EventList} from "../../components/eventsList/eventList";
import {EventStatusFilter} from "../../components/eventStatusFilter/eventStatusFilter";
import {EventsAdditionalInformation} from "../../components/eventsAdditionalInformation/eventsAdditionalInformation";

export const TournamentsPage = () => {
    const [events, setEvents] = useState([
        {game: dota, header: "ZP CSGO 5vs5", startDate: "25.10.22", endDate: "26.10.20",maxPlace: 64, location: "LAN", tournamentSystem: "Double-Elimination BO1 / Final BO3", regulationsLink: "#", registerLink: "#",  prize: "₴1500", teams: ["bbbbb","aaa","aaa","aaa","aaa","aaa","aaa","aaa","aaa","aaa","aaa","aaa","aaa","aaa","aaa","aaa","aaa","aaa","aaa","aaa","aaa","aaa","aaa", "aaa", "aaa", "aaa", "aaa", "aaa", "aaa", "aaa", "aaa"], important: false, id: 0},
        {game: dota, header: "Twsad", startDate: "25.10.20", endDate: "26.10.20", maxPlace: 64, prize: "₴1500", location: "LAN", tournamentSystem: "Double-Elimination BO1 / Final BO3", regulationsLink: "#", registerLink: "#", teams: ["bbbbb", "aaa","aaa","aaa","aaa","aaa","aaa", "aaa", "aaa", "aaa", "aaa", "aaa", "aaa", "aaa"],important: false, id: 1},
        {game: valorant, header: "a", startDate: "25.10.20", endDate: "26.10.20", maxPlace: 64, prize: "₴1500", location: "LAN", tournamentSystem: "Double-Elimination BO1 / Final BO3", regulationsLink: "#", registerLink: "#", teams: ["bbbbb","aaa","aaa","aaa","aaa","aaa","aaa", "aaa", "aaa", "aaa", "aaa", "aaa", "aaa", "aaa"], important: false, id: 2},
        {game: dota, header: "dsad", startDate: "25.10.20", endDate: "26.10.20", maxPlace: 64, prize: "₴1500", location: "LAN", tournamentSystem: "Double-Elimination BO1 / Final BO3", regulationsLink: "#", registerLink: "#", teams: ["bbbbb", "aaa","aaa","aaa","aaa","aaa","aaa", "aaa", "aaa", "aaa", "aaa", "aaa", "aaa", "aaa"], important: false, id: 3},
        {game: valorant, header: "DOTA CUP", startDate: "25.10.20", endDate: "26.10.20", maxPlace: 64, prize: "₴1500", location: "LAN", tournamentSystem: "Double-Elimination BO1 / Final BO3", regulationsLink: "#", registerLink: "#", teams: ["bbbbb", "aaa","aaa","aaa","aaa","aaa","aaa", "aaa", "aaa", "aaa", "aaa", "aaa", "aaa", "aaa"], important: false, id: 4},
        {game: dota, header: "ZP Fast CUP 5 vs 5", startDate: "25.10.20", endDate: "26.10.20",maxPlace: 64, prize: "₴1500", location: "LAN", tournamentSystem: "Double-Elimination BO1 / Final BO3", regulationsLink: "#", registerLink: "#", teams: ["bbbbb","aaa","aaa","aaa","aaa","aaa", "aaa", "aaa", "aaa", "aaa", "aaa", "aaa", "aaa", "aaa"], important: false, id: 5},
        {game: dota, header: "KEKW", startDate: "25.10.20", endDate: "26.10.20", maxPlace: 64, prize: "₴1500", location: "LAN", tournamentSystem: "Double-Elimination BO1 / Final BO3", regulationsLink: "#", registerLink: "#", teams: ["bbbbb", "aaa", "aaa", "aaa","aaa","aaa","aaa","aaa","aaa", "aaa", "aaa", "aaa", "aaa", "aaa"], important: false, id: 6}
    ])
    const [term, setTerm] = useState("")
    const [filter, setFilter] = useState(false)
    const [active, setActive] = useState(false)

    const onToggleImportant = id => {
        const index = events.findIndex((el) => el.id === id);
        const old = events[index];
        const newItem = {...old, important: !old.important};
        const newArr = [...events.slice(0, index), newItem, ...events.slice(index + 1)];
        localStorage.setItem("Important data", JSON.stringify(newArr))
        setEvents(newArr)
    }

    const onToggleActive = id => {
        if (active.id === id) {
            setActive(false)
        } else {
            const index = events.findIndex((el) => el.id === id);
            setActive(events[index])
        }
    }
    console.log(active)
    useEffect(() => {
        localStorage.setItem("Important data", JSON.stringify(events))
        const data = JSON.parse(localStorage.getItem("Important data"))
        setEvents(data)
    }, [setEvents])


    const onUpdateSearch = (term) => {
        setTerm(term)
    }

    const onFilterSelect = (filter) => {
        setFilter(filter)
    }

    const searchPost = (items, term) => {
        if (term.length === 0 ) {
            return items
        }
        return items.filter((el) => {
            return el.header.toLowerCase().indexOf(term.toLowerCase()) !== -1
        })
    }

    const filterPost = (items, filter) => {
        return filter ? items.filter(item => item.important) : items
    }

    const allPosts = events.filter((item) => typeof item === 'object' && isEmpty(item))

    function isEmpty(obj) {
        for(let key in obj)
        {
            return true;
        }
        return false;
    }

    const visiblePosts = filterPost(searchPost(allPosts, term), filter)
    console.log(events)
    return (
        <div className="content">
            <div className="left">
            <div className="filters">
                <EventSearchPanel
                    onUpdateSearch={onUpdateSearch}/>
                <EventStatusFilter
                    filter={filter}
                    onFilterSelect={onFilterSelect}
                />
            </div>
                <EventList
                    posts={visiblePosts}
                    onToggleImportant={onToggleImportant}
                    onToggleActive={onToggleActive}
                    activeId={active.id}
                />
            </div>
            <div className="right">
                {active && <EventsAdditionalInformation
                    {...active}
                />}
            </div>
        </div>
    )
}