import React from "react";
import {TournamentIcon} from "../tournamentIcon/tournamentIcon";

export const EventList = ({posts, onToggleImportant, onToggleActive, activeId}) => {

    const tournaments = posts.map((item) => {
        const {id, ...itemProps} = item;
        return (
            <TournamentIcon key={id}
                            id={id}
                            {...itemProps}
                            onToggleImportant={() => onToggleImportant(id)}
                            onToggleActive={() => onToggleActive(id)}
                            activeId={activeId}
            />
        )
    })
    return (
        <>

            <div className="tournaments" id="style-1">
                {tournaments}
            </div>
        </>
    )
}