import React, {useState} from "react";

import components from "../modules/components.module.css";

export const StaticInput = (props) => {
    const {labelValue, changeHandler, name, id, value} = props
    return (
        <>
            <label htmlFor={name}>{labelValue}</label>
            <input
                className={components.input_validate}
                id={id}
                type="text"
                name={name}
                value={value}
                onChange={(e) => changeHandler(e)}
            />
        </>
    )
}

export const InputPassword = (props) => {
    const {labelValue, changeHandler, name, id, value} = props
    const [show, setShow] = useState(false)
    return (
        <>
            <label htmlFor={name}>{labelValue}</label>
            <div className={components.password_input}>
                <input
                    className={components.input_validate}
                    id={id}
                    type={show ? "text" : "password"}
                    name={name}
                    value={value}
                    onChange={(e) => changeHandler(e)}
                />
                <button className={components.password_btn}
                        style={show ? {background: "#333333", color: "#FFFFFF"} : {background: "#FFFFFF"}}
                        onClick={() => setShow(!show)}>show</button>
            </div>
        </>
    )
}

export const SearchInput = (props) => {
    const {value, changeHandler, id, placeholder} = props
    return (
        <>
            <input
                className={components.search_input}
                id={id}
                type="text"
                value={value}
                placeholder={placeholder}
                onChange={(e) => changeHandler(e)}
            />
        </>
    )
}