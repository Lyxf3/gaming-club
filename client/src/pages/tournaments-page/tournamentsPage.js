import React, {useEffect, useState} from 'react'

import {data} from './data'
import {EventSearchPanel} from "../../components/eventSearchPanel/eventSearchPanel";
import {EventList} from "../../components/eventsList/eventList";
import {EventStatusFilter} from "../../components/eventStatusFilter/eventStatusFilter";
import {EventsAdditionalInformation} from "../../components/eventsAdditionalInformation/eventsAdditionalInformation";

import './tournamentsPage.css'

export const TournamentsPage = () => {
    const [events, setEvents] = useState(data)
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

    useEffect(() => {
        const newData = JSON.parse(localStorage.getItem("Important data"))
        console.log(newData)
        setEvents(newData)
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