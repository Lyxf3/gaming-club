import React, {useEffect, useState} from "react";
import {NavLink, withRouter} from "react-router-dom";
import {StaticInput, InputPassword} from "../authPageItems";
import "./authPage.css"

import titles from "../../modules/titles.module.css";
import buttons from "../../modules/buttons.module.css";
import {useHttp} from "../../hooks/http.hook";
import {useMessage} from "../../hooks/message.hook";
import ParticlesComponent from "../particles-background/ParticlesComponent";
import dotStyles from "../dots/dots.module.css";

const Register = () => {
    const {loading, request, error, clearError} = useHttp()
    const message = useMessage()

    const [form, setForm] = useState({
        login: "", email: "", password: ""
    })
    const changeHandler = event => {
        setForm({ ...form, [event.target.name]: event.target.value })
    }
    useEffect(() => {
        message(error)
        clearError()
    }, [error, message, clearError])

    useEffect(() => {
        window.M.updateTextFields()
    }, [])
    const registerHandler = async () => {
        try {
            const data = await request('/api/auth/register', 'POST', {...form})
            message(data.message)
        } catch (e) {}
    }
const register= {
    static: [
        {labelValue: "Логин", id: "login", name: "login"},
        {labelValue: "Email", id: "email", name: "email"}
    ],
    password: [
        {labelValue: "Пароль", id: "password", name: "password"}
    ]
}

    const statInputs = register.static.map( (item) => {
        if ( typeof item === 'object' && isEmpty(item) ){
            const {id, ...itemProps} = item;
            return (
                <div key={id} className="input-field">
                    <StaticInput
                        {...itemProps}
                        id={id}
                        changeHandler={(e) => changeHandler(e)}/>
                </div>
            )
        }
    })
    const passInput = register.password.map( (item) => {
        if ( typeof item === 'object' && isEmpty(item) ){
            const {id, ...itemProps} = item;
            return (
                <div key={id} className="input-field">
                    <InputPassword
                        id={id}
                        {...itemProps}
                        changeHandler={(e) => changeHandler(e)}/>
                </div>
            )
        }
    })
    function isEmpty(obj) {
        for(let key in obj)
        {
            return true;
        }
        return false;
    }
    return (
        <>
            <div className="auth">
                <span className={titles.title}>Регистрация аккаунта</span>
                {statInputs}
                {passInput}

            <div className="card-action">
                    <NavLink to={"/auth/login"} exact >
                        <button
                            className={buttons.btn_dark}
                            disabled={loading}>
                                Войти
                        </button>
                    </NavLink>

                <button
                        className={buttons.btn_white}
                        onClick={(e) => registerHandler(e)}
                        disabled={loading}
                    >
                        Подтвердить</button>
                </div>
            </div>
        </>
        )
}

export default withRouter(Register)