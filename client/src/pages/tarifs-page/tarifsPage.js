import React, { useState} from 'react'
import {TariffsList} from "../../components/tariffsList/tariffsList";
import {TariffsBook} from "../../components/tariffsBook/TariffsBook";
import './tarifsPage.css'

export const TarifsPage = () => {
    const [active, setActive] = useState(false)
    const tariffsData = [
        {
            id:0,
            header:"standard-zone",
            pcSettings: [
                "cpu: Intel Core I5-8900K @ 4.2ghz",
                "gpu: msi gaming x 1080ti",
                "ram:16gb DDr4"
            ],
            periphery: [
                "Monitor: benq 144 ghz",
                "mouse: hypex pulse fire surge",
                "headphones: hyperx rovolver s",
                "keyboard: klaviatura"
            ],
            timeAndCost: [
                {time: "08:00-22:59", cost: 60},
                {time: "23:00-07:59", cost: 20}
            ]
        },
        {
            id:1,
            header:"VIP-zone",
            pcSettings: [
                "cpu: Intel Core I5-8900K @ 4.2ghz",
                "gpu: msi gaming x 1080ti",
                "ram:16gb DDr4"
            ],
            periphery: [
                "Monitor: benq 144 ghz",
                "mouse: hypex pulse fire surge",
                "headphones: hyperx rovolver s",
                "keyboard: klaviatura"
            ],
            timeAndCost: [
                {time: "08:00-22:59", cost: 60},
                {time: "23:00-07:59", cost: 20}
            ]
        },
        {
            id:2,
            header:"PS4-zone",
            pcSettings: [
                "cpu: Intel Core I5-8900K @ 4.2ghz",
                "gpu: msi gaming x 1080ti",
                "ram:16gb DDr4"
            ],
            periphery: [
                "Monitor: benq 144 ghz",
                "mouse: hypex pulse fire surge",
                "headphones: hyperx rovolver s",
                "keyboard: klaviatura"
            ],
            timeAndCost: [
                {time: "08:00-22:59", cost: 60},
                {time: "23:00-07:59", cost: 20}
            ]
        }
    ]
    const [pcs, setPcs] = useState([
        [{status: false}, {status: true}, {status: false}, {status: false}, {status: false}, {status: false}, {status: false}],
        [{status: false}, {status: false}, {status: false}, {status: false}, {status: false}, {status: false}, {status: false}],
        [{status: false}, {status: false}, {status: false}, {status: false}, {status: false}, {status: false}, {status: false}]
    ])
    const onToggleActive = id => {
        if (active.id === id) {
            setActive(false)
        } else {
            const index = tariffsData.findIndex((el) => el.id === id);
            setActive(tariffsData[index])
        }
    }

    const allTariffs = tariffsData.filter((item) => typeof item === 'object' && isEmpty(item))

    function isEmpty(obj) {
        for(let key in obj)
        {
            return true;
        }
        return false;
    }
    const setPCHandler = id => {
        let isBook = window.confirm("Забронировать " + (id + 1) + " ПК?");

        if(isBook) {
        const header = active.header
        const price = active.timeAndCost[0].cost
        const newObj = {header, id, price}
            localStorage.setItem("Booked PC", JSON.stringify(newObj))
        setActive(false)
        }
    }

    return (
        <div className="content">
            <div className="left1">
                <TariffsList
                data={allTariffs}
                onToggleActive={onToggleActive}
                activeId={active.id}
                />
            </div>
            <div className="right1">
                {active && <TariffsBook
                    header={active.header}
                    pcs={pcs[active.id]}
                    activeId={active.id}
                    setPCHandler={setPCHandler}
                />}
            </div>
        </div>
    )
}