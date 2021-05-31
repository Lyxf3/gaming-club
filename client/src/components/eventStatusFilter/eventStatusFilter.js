import {useState} from "react";

export const EventStatusFilter = ({filter, onFilterSelect}) => {
    const [btnFilter, setBtnFilter] = useState(true)
    const active = !!filter;
    const btnClass = active ? 'btn-info' : 'btn-outline-secondary'

    return (
        <div className="btn-group">
            <button
                key="important"
                type="button"
                className={`btn ${btnClass}`}
                onClick={() => {
                    setBtnFilter(prev => !prev)
                    return onFilterSelect(btnFilter)
                }
                }>Важные</button>
        </div>
    )
}