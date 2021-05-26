import components from "../modules/components.module.css";

import React, {useState} from "react";

export const StaticInput = (props) => {
    const {labelValue, changeHandler, name, id} = props
    return (
        <>
            <label htmlFor={name}>{labelValue}</label>
            <input
                className={components.input_validate}
                id={id}
                type="text"
                name={name}
                onChange={(e) => changeHandler(e)}
            />
        </>
    )
}

export const InputPassword = (props) => {
    const {labelValue, changeHandler, name, id} = props
    const [show, setShow] = useState(false)
    return (
        <>
            <label htmlFor={name}>{labelValue}</label>
            <input
                className={components.input_validate}
                id={id}
                type={show ? "text" : "password"}
                name={name}
                onChange={(e) => changeHandler(e)}
            />
            <button
            onClick={() => setShow(!show)}>click</button>
        </>
    )
}